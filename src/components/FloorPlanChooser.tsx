import { useState } from "react";
import { ChevronDown } from "lucide-react";
import floorplan from "@/assets/floorplan-iso.jpg";
import type { Room } from "@/data/rooms";

type ProjectOption = { slug: string; name: string; client: string };

type Props = {
  rooms: Room[];
  onSelectRoom: (roomId: string) => void;
  projects: ProjectOption[];
  selectedProjectSlug: string;
  onSelectProject: (slug: string) => void;
  /** True when there's no fullscreen button competing for the bottom-right corner
   *  (iOS) — the hint can sit flush in the corner instead of leaving it room. */
  isIOS?: boolean;
};

export function FloorPlanChooser({
  rooms,
  onSelectRoom,
  projects,
  selectedProjectSlug,
  onSelectProject,
  isIOS = false,
}: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      <img
        src={floorplan}
        alt="Planta isométrica do showroom M7"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/70" />

      {/*
        Mobile: one compact row — kicker text left, selector right. No stacked title,
        it would eat into the floor plan and cover the room markers near the top edge
        (the page's own hero above already explains the tour, and the bottom CTA bar
        already tells people to tap a marker, so the title is redundant here anyway).
        sm and up: original centered kicker+title with the selector pinned top-right.
      */}
      <div className="absolute inset-x-0 top-0 pt-3 px-3 flex items-center justify-between gap-3 sm:block sm:pt-8 sm:px-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-bronze sm:hidden">
          Tour 360° Imersivo
        </p>

        <div className="hidden sm:block sm:text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-bronze mb-2">
            Tour 360° Imersivo
          </p>
          <h2 className="font-display text-2xl md:text-4xl text-white leading-snug">
            Escolha um ambiente e explore cada projeto
          </h2>
        </div>

        {/* Project/model selector — switches between different 3D-toured properties, not rooms */}
        <div className="sm:absolute sm:top-8 sm:right-6">
          <label className="relative block">
            <span className="sr-only">Selecionar projeto 3D</span>
            <select
              value={selectedProjectSlug}
              onChange={(e) => onSelectProject(e.target.value)}
              className="appearance-none max-w-[55vw] sm:max-w-[80vw] bg-black/60 backdrop-blur border border-white/15 text-white text-[9px] sm:text-[11px] uppercase tracking-widest pl-3 sm:pl-4 pr-8 sm:pr-9 py-1.5 sm:py-2.5 cursor-pointer hover:border-bronze/60 focus:outline-none focus:border-bronze truncate"
            >
              {projects.map((p) => (
                <option key={p.slug} value={p.slug} className="bg-ink text-white">
                  {p.name} — {p.client}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-bronze" />
          </label>
        </div>
      </div>

      {rooms.map((room, i) => (
        <button
          key={room.id}
          onClick={() => onSelectRoom(room.id)}
          onMouseEnter={() => setHoveredId(room.id)}
          onMouseLeave={() => setHoveredId((cur) => (cur === room.id ? null : cur))}
          className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: `${room.x}%`, top: `${room.y}%` }}
          aria-label={room.name}
        >
          <span
            className={`absolute inset-0 m-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bronze/40 animate-ping ${hoveredId && hoveredId !== room.id ? "opacity-0" : ""}`}
          />
          <span
            className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/95 shadow-[0_0_25px_rgba(176,138,74,0.9)] backdrop-blur text-white text-xs sm:text-sm font-medium transition-transform ${
              hoveredId === room.id ? "scale-110 bg-bronze" : "bg-bronze/90 group-hover:scale-110"
            }`}
          >
            {i + 1}
          </span>
          <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap px-3 py-1 text-[10px] uppercase tracking-[0.25em] bg-black/85 border border-bronze/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
            {room.name}
          </span>
        </button>
      ))}

      {/*
        Mobile: parked tight against the bottom-right corner so it stays clear of the
        hall marker at x:50%/y:88% — a centered bar there collides with it. On iOS
        there's no fullscreen button sharing that corner (see isIOS), so it can sit
        flush against the edge (right-3) instead of leaving room for one (right-16).
        sm and up: original centered, single-line placement at the bottom.
      */}
      <div
        className={`absolute bottom-3 sm:right-auto sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 w-max whitespace-nowrap sm:max-w-[92%] text-center bg-black/60 backdrop-blur text-white/80 text-[7px] sm:text-[11px] tracking-normal sm:tracking-widest px-2 sm:px-4 py-1.5 sm:py-2 border border-white/10 uppercase pointer-events-none ${
          isIOS ? "right-3" : "right-16"
        }`}
      >
        <span className="sm:hidden">Toque num ambiente</span>
        <span className="hidden sm:inline">Toque em um ambiente para entrar no tour 360°</span>
      </div>
    </div>
  );
}
