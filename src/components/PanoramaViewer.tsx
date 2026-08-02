import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { Hotspot } from "@/data/rooms";
import { Plus, ChevronLeft, RotateCw } from "lucide-react";

type RoomNavItem = { id: string; name: string };

type Props = {
  src: string;
  hotspots?: Hotspot[];
  onHotspotClick?: (h: Hotspot) => void;
  onBack?: () => void;
  rooms?: RoomNavItem[];
  activeRoomId?: string;
  onNavigateRoom?: (roomId: string) => void;
  fullscreen?: boolean;
};

const CAMERA_RADIUS = 0.0001;
// The source panoramas are a fixed 3840x1920. A narrower FOV (more "zoom") stretches
// fewer of those source pixels across the viewport — the wider the render surface,
// the more that stretch shows up as blur. In fullscreen the canvas can be 2-3x wider
// than the normal embedded player, so we widen the FOV range a bit to avoid piling
// extra magnification on top of that. Kept modest: pushing FOV too wide over-corrects
// into fisheye-style stretching at the edges of the frame, trading center sharpness
// for blurrier corners.
const DEFAULT_FOV = 90;
const MIN_FOV = 55;
const MAX_FOV = 100;
const FULLSCREEN_DEFAULT_FOV = 96;
const FULLSCREEN_MIN_FOV = 62;
const FULLSCREEN_MAX_FOV = 106;
const FOCUS_DURATION_MS = 650;

/**
 * Convert yaw/pitch (degrees) into a 3D point on a sphere of given radius.
 * yaw follows the standard equirectangular convention the source panoramas were
 * authored with: 0° = horizontal center of the image, ±180° = the left/right seam.
 */
function sphericalToCartesian(yawDeg: number, pitchDeg: number, radius = 450) {
  // -90 rearms yaw so 0° lands on the image's horizontal center instead of the
  // sphere mesh's own phi=0 seam (which sits a quarter-turn off from center).
  const yaw = THREE.MathUtils.degToRad(yawDeg - 90);
  const pitch = THREE.MathUtils.degToRad(pitchDeg);
  const x = radius * Math.cos(pitch) * Math.sin(yaw);
  const y = radius * Math.sin(pitch);
  const z = -radius * Math.cos(pitch) * Math.cos(yaw);
  return [x, y, z] as const;
}

/** Inverse of sphericalToCartesian: recover yaw/pitch (degrees) from a 3D point. */
function cartesianToSphericalDeg(pos: THREE.Vector3) {
  const r = pos.length() || CAMERA_RADIUS;
  const pitch = Math.asin(THREE.MathUtils.clamp(pos.y / r, -1, 1));
  let yaw = THREE.MathUtils.radToDeg(Math.atan2(pos.x, -pos.z)) + 90;
  if (yaw > 180) yaw -= 360;
  if (yaw < -180) yaw += 360;
  return { yaw, pitch: THREE.MathUtils.radToDeg(pitch) };
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Shortest-path lerp between two angles in degrees (avoids the long way around). */
function lerpAngleDeg(a: number, b: number, t: number) {
  const diff = ((((b - a) % 360) + 540) % 360) - 180;
  return a + diff * t;
}

function PanoramaSphere({ src }: { src: string }) {
  const texture = useLoader(THREE.TextureLoader, src);
  const { gl } = useThree();

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
  }, [texture, gl]);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 128, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

/** FOV-based zoom (like Google Street View) instead of moving the camera. */
function FovZoom({
  controlsRef,
  minFov,
  maxFov,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  minFov: number;
  maxFov: number;
}) {
  const { camera, gl } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    const cam = camera as THREE.PerspectiveCamera;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = THREE.MathUtils.clamp(cam.fov + e.deltaY * 0.04, minFov, maxFov);
      cam.fov = next;
      cam.updateProjectionMatrix();
      controlsRef.current?.update();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [camera, gl, controlsRef, minFov, maxFov]);
  return null;
}

/** Resets the camera FOV back to default whenever the panorama source or default changes. */
function FovReset({ src, defaultFov }: { src: string; defaultFov: number }) {
  const { camera } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = defaultFov;
    cam.updateProjectionMatrix();
  }, [src, defaultFov, camera]);
  return null;
}

/** Animates the camera (yaw/pitch + FOV) toward a hotspot to simulate "walking up" to it. */
function CameraHotspotFocus({
  controlsRef,
  target,
  focusFov,
  onArrive,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  target: { yaw: number; pitch: number; nonce: number } | null;
  focusFov: number;
  onArrive: () => void;
}) {
  const { camera } = useThree();
  const anim = useRef<{
    from: { yaw: number; pitch: number; fov: number };
    to: { yaw: number; pitch: number; fov: number };
    start: number;
  } | null>(null);
  const lastNonce = useRef<number | null>(null);

  useEffect(() => {
    if (!target || target.nonce === lastNonce.current) return;
    lastNonce.current = target.nonce;
    const cam = camera as THREE.PerspectiveCamera;
    // The camera sits near the origin and looks *at* the origin, so its gaze direction
    // is the negation of its position vector — negate before recovering yaw/pitch.
    const cur = cartesianToSphericalDeg(cam.position.clone().negate());
    if (controlsRef.current) controlsRef.current.enabled = false;
    anim.current = {
      from: { yaw: cur.yaw, pitch: cur.pitch, fov: cam.fov },
      to: { yaw: target.yaw, pitch: target.pitch, fov: focusFov },
      start: performance.now(),
    };
  }, [target, camera, controlsRef, focusFov]);

  useFrame(() => {
    const a = anim.current;
    if (!a) return;
    const t = Math.min(1, (performance.now() - a.start) / FOCUS_DURATION_MS);
    const e = easeInOutCubic(t);
    const yaw = lerpAngleDeg(a.from.yaw, a.to.yaw, e);
    const pitch = THREE.MathUtils.lerp(a.from.pitch, a.to.pitch, e);
    const fov = THREE.MathUtils.lerp(a.from.fov, a.to.fov, e);

    const cam = camera as THREE.PerspectiveCamera;
    // Position the camera at the antipode of the desired gaze direction so that,
    // after lookAt(origin), it actually faces (yaw, pitch) — not away from it.
    const [x, y, z] = sphericalToCartesian(yaw, pitch, CAMERA_RADIUS);
    cam.position.set(-x, -y, -z);
    cam.lookAt(0, 0, 0);
    cam.fov = fov;
    cam.updateProjectionMatrix();

    if (t >= 1) {
      anim.current = null;
      if (controlsRef.current) controlsRef.current.enabled = true;
      onArrive();
    }
  });

  return null;
}

export function PanoramaViewer({
  src,
  hotspots = [],
  onHotspotClick,
  onBack,
  rooms,
  activeRoomId,
  onNavigateRoom,
  fullscreen = false,
}: Props) {
  const controls = useRef<OrbitControlsImpl>(null);
  const [ready, setReady] = useState(false);
  const defaultFov = fullscreen ? FULLSCREEN_DEFAULT_FOV : DEFAULT_FOV;
  const minFov = fullscreen ? FULLSCREEN_MIN_FOV : MIN_FOV;
  const maxFov = fullscreen ? FULLSCREEN_MAX_FOV : MAX_FOV;
  const [focusTarget, setFocusTarget] = useState<{
    yaw: number;
    pitch: number;
    nonce: number;
  } | null>(null);
  const pendingHotspot = useRef<Hotspot | null>(null);

  // Give the camera a moment to settle before showing hotspots (avoids flash).
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 250);
    return () => clearTimeout(t);
  }, [src]);

  // Reset the camera's FOV back to the default whenever the room changes.
  useEffect(() => {
    setFocusTarget(null);
    pendingHotspot.current = null;
  }, [src]);

  const positions = useMemo(
    () => hotspots.map((h) => ({ h, pos: sphericalToCartesian(h.yaw, h.pitch) })),
    [hotspots],
  );

  const handleHotspotClick = (h: Hotspot) => {
    pendingHotspot.current = h;
    setFocusTarget({ yaw: h.yaw, pitch: h.pitch, nonce: Date.now() });
  };

  const handleArrive = () => {
    if (pendingHotspot.current) onHotspotClick?.(pendingHotspot.current);
  };

  return (
    <div className="relative h-full w-full bg-black">
      <Canvas
        dpr={fullscreen ? [1, 2.5] : [1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ fov: defaultFov, near: 0.1, far: 1100, position: [0, 0, CAMERA_RADIUS] }}
      >
        <Suspense fallback={null}>
          <FovReset src={src} defaultFov={defaultFov} />
          <PanoramaSphere src={src} />
          {ready &&
            positions.map(({ h, pos }) => (
              <Html
                key={h.id}
                position={pos as unknown as [number, number, number]}
                center
                distanceFactor={400}
                zIndexRange={[10, 0]}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHotspotClick(h);
                  }}
                  className="group relative flex items-center justify-center"
                  aria-label={h.label}
                >
                  <span
                    className={`absolute inset-0 m-auto rounded-full bg-bronze/40 animate-ping ${fullscreen ? "w-20 h-20" : "w-12 h-12"}`}
                  />
                  <span
                    className={`relative flex items-center justify-center rounded-full bg-bronze/90 border-2 border-white/95 shadow-[0_0_25px_rgba(176,138,74,0.9)] backdrop-blur transition-transform group-hover:scale-110 ${fullscreen ? "w-20 h-20" : "w-12 h-12"}`}
                  >
                    <Plus className={fullscreen ? "w-9 h-9 text-white" : "w-5 h-5 text-white"} />
                  </span>
                  <span
                    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 top-full whitespace-nowrap uppercase bg-black/85 border border-bronze/40 text-white opacity-0 group-hover:opacity-100 transition-opacity ${
                      fullscreen
                        ? "mt-3 px-5 py-2 text-base tracking-[0.2em]"
                        : "mt-2 px-3 py-1 text-[10px] tracking-[0.25em]"
                    }`}
                  >
                    {h.label}
                  </span>
                </button>
              </Html>
            ))}
        </Suspense>
        <OrbitControls
          ref={controls}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={-0.28}
          minPolarAngle={0.25}
          maxPolarAngle={Math.PI - 0.25}
        />
        <FovZoom controlsRef={controls} minFov={minFov} maxFov={maxFov} />
        <CameraHotspotFocus
          controlsRef={controls}
          target={focusTarget}
          focusFov={minFov}
          onArrive={handleArrive}
        />
      </Canvas>

      {/* 360° badge */}
      <div
        className={`absolute top-5 right-5 z-30 flex items-center gap-2 bg-black/60 backdrop-blur text-white border border-bronze/40 uppercase pointer-events-none ${
          fullscreen ? "gap-3 text-lg px-5 py-3" : "gap-2 text-[11px] px-3 py-2"
        }`}
      >
        <RotateCw className={fullscreen ? "w-6 h-6 text-bronze" : "w-3.5 h-3.5 text-bronze"} />
        360°
      </div>

      {/* Back to floor plan */}
      {onBack && (
        <button
          onClick={onBack}
          className={`absolute top-5 left-5 z-30 flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur text-white uppercase transition-colors border ${
            fullscreen
              ? "gap-3 text-lg px-6 py-3 border-white/15"
              : "gap-2 text-[11px] px-4 py-2 border-white/15"
          }`}
        >
          <ChevronLeft className={fullscreen ? "w-6 h-6" : "w-4 h-4"} /> Voltar à planta
        </button>
      )}

      {/* Room-to-room navigation */}
      {rooms && rooms.length > 1 && onNavigateRoom && (
        <div
          className={`absolute top-5 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center bg-black/60 backdrop-blur border border-white/10 max-w-[60vw] overflow-x-auto ${
            fullscreen ? "gap-2 px-3 py-3" : "gap-1 px-2 py-2"
          }`}
        >
          {rooms.map((r) => (
            <button
              key={r.id}
              onClick={() => onNavigateRoom(r.id)}
              className={`whitespace-nowrap uppercase transition-colors ${
                fullscreen
                  ? "px-5 py-2.5 text-sm tracking-wider"
                  : "px-3 py-1.5 text-[10px] tracking-widest"
              } ${
                r.id === activeRoomId
                  ? "bg-bronze text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      )}

      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur text-white/80 tracking-widest border border-white/10 uppercase pointer-events-none ${
          fullscreen ? "text-base px-6 py-3" : "text-[11px] px-4 py-2"
        }`}
      >
        Arraste para olhar · Scroll para zoom · Clique nos pontos dourados
      </div>
    </div>
  );
}
