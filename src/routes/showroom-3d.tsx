import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  X,
  MessageCircle,
  User,
  MousePointer2,
  RotateCw,
  Sparkles,
  Maximize,
  Minimize,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { whatsappLink } from "@/lib/whatsapp";
import { FloorPlanChooser } from "@/components/FloorPlanChooser";
import { rooms, type Hotspot, type Room } from "@/data/rooms";

const PanoramaViewer = lazy(() =>
  import("@/components/PanoramaViewer").then((m) => ({ default: m.PanoramaViewer })),
);

export const Route = createFileRoute("/showroom-3d")({
  head: () => ({
    meta: [
      { title: "Tour 360° Imersivo — M7 Movelaria" },
      {
        name: "description",
        content:
          "Tour virtual 360° M7 Movelaria: escolha um ambiente na planta e explore cada projeto em imersão total, com fotos reais e detalhes técnicos de cada móvel.",
      },
      { property: "og:title", content: "Tour 360° Imersivo — M7 Movelaria" },
      {
        property: "og:description",
        content: "Escolha um ambiente na planta e explore em 360° com fotos reais dos projetos M7.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://m7movelaria.online/showroom-3d" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://m7movelaria.online/showroom-3d" }],
  }),
  component: Showroom3DPage,
});

function Showroom3DPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [detail, setDetail] = useState<{ h: Hotspot; room: Room } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) ?? null;

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === viewerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      viewerRef.current?.requestFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-ink text-white">
      <SiteHeader />
      <main>
        <section className="pt-28 pb-6 max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-bronze mb-3">
            Tour Virtual · Imersão 360°
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight">Tour 360° Imersivo</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Escolha um ambiente na planta e entre em uma imersão 360° com fotos reais dos projetos
            M7 — hall, sala, cozinha, dormitório, closet, lavabo, escritório e adega. Clique nos
            pontos dourados para se aproximar de cada móvel e ver marca, material e execução.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-[11px] uppercase tracking-widest text-white/50">
            <span className="inline-flex items-center gap-2">
              <MousePointer2 className="w-4 h-4 text-bronze" /> Arraste para olhar
            </span>
            <span className="inline-flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-bronze" /> Imersão 360°
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-bronze" /> Pontos dourados
            </span>
          </div>
        </section>

        <section className="pb-16 max-w-7xl mx-auto px-4">
          <div
            ref={viewerRef}
            className="relative w-full h-[75vh] min-h-[560px] border border-bronze/20 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] overflow-hidden bg-black"
          >
            <button
              onClick={toggleFullscreen}
              className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur text-white text-[11px] tracking-widest px-4 py-2 border border-white/15 uppercase transition-colors"
              aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              {isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
            </button>
            {selectedRoom ? (
              <Suspense
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs uppercase tracking-[0.3em] bg-black">
                    Carregando ambiente em 360°…
                  </div>
                }
              >
                <PanoramaViewer
                  key={selectedRoom.id}
                  src={selectedRoom.panorama}
                  hotspots={selectedRoom.hotspots}
                  onHotspotClick={(h) => setDetail({ h, room: selectedRoom })}
                  onBack={() => setSelectedRoomId(null)}
                  rooms={rooms.map((r) => ({ id: r.id, name: r.name }))}
                  activeRoomId={selectedRoom.id}
                  onNavigateRoom={setSelectedRoomId}
                />
              </Suspense>
            ) : (
              <FloorPlanChooser rooms={rooms} onSelectRoom={setSelectedRoomId} />
            )}
          </div>
        </section>
      </main>
      <SiteFooter />

      {detail && (
        <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-black/90 backdrop-blur-xl border-l border-bronze/20 text-white p-8 z-[100] overflow-y-auto animate-in slide-in-from-right duration-300">
          <button
            onClick={() => setDetail(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-bronze transition-colors flex items-center justify-center"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>

          <p className="text-[10px] uppercase tracking-[0.35em] text-bronze">
            {detail.h.categoria}
          </p>
          <h4 className="font-display text-3xl mt-2 leading-tight">{detail.h.label}</h4>

          <p className="text-[11px] text-white/50 mt-2 uppercase tracking-[0.25em]">
            {detail.room.name}
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/50">Marca</div>
              <div className="text-base text-white mt-1">{detail.h.marca}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/50">
                Modelo / Especificação
              </div>
              <div className="text-sm text-white/90 mt-1">{detail.h.modelo}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/50">Execução M7</div>
              <div className="text-sm text-white/80 mt-1 leading-relaxed">{detail.h.detalhe}</div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-bronze mb-2">Projeto</div>
            <p className="text-sm text-white/90 flex items-center gap-2">
              <User className="w-3 h-3 text-bronze" /> {detail.room.cliente}
            </p>
          </div>

          <a
            href={whatsappLink(
              `Olá M7, vi o ${detail.h.label} no tour 360° (${detail.room.name}) e gostaria de um orçamento.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-bronze text-white text-xs uppercase tracking-[0.25em] px-5 py-4 hover:bg-bronze/90 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Solicitar orçamento
          </a>
          <p className="text-[10px] text-white/40 text-center mt-3 uppercase tracking-widest">
            (41) 98711-6308 · m7movelaria@outlook.com.br
          </p>
        </div>
      )}
    </div>
  );
}
