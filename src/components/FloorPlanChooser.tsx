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
};

export function FloorPlanChooser({
  rooms,
  onSelectRoom,
  projects,
  selectedProjectSlug,
  onSelectProject,
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

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center px-6">
        <p className="text-[11px] uppercase tracking-[0.4em] text-bronze mb-2">
          Tour 360° Imersivo
        </p>
        <h2 className="font-display text-2xl md:text-4xl text-white">
          Escolha um ambiente e explore cada projeto
        </h2>
      </div>

      {/* Project/model selector — switches between different 3D-toured properties, not rooms */}
      <div className="absolute top-5 right-5">
        <label className="relative block">
          <span className="sr-only">Selecionar projeto 3D</span>
          <select
            value={selectedProjectSlug}
            onChange={(e) => onSelectProject(e.target.value)}
            className="appearance-none bg-black/60 backdrop-blur border border-white/15 text-white text-[11px] uppercase tracking-widest pl-4 pr-9 py-2.5 cursor-pointer hover:border-bronze/60 focus:outline-none focus:border-bronze"
          >
            {projects.map((p) => (
              <option key={p.slug} value={p.slug} className="bg-ink text-white">
                {p.name} — {p.client}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-bronze" />
        </label>
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
            className={`absolute inset-0 m-auto w-10 h-10 rounded-full bg-bronze/40 animate-ping ${hoveredId && hoveredId !== room.id ? "opacity-0" : ""}`}
          />
          <span
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/95 shadow-[0_0_25px_rgba(176,138,74,0.9)] backdrop-blur text-white text-sm font-medium transition-transform ${
              hoveredId === room.id ? "scale-110 bg-bronze" : "bg-bronze/90 group-hover:scale-110"
            }`}
          >
            {i + 1}
          </span>
          <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap px-3 py-1 text-[10px] uppercase tracking-[0.25em] bg-black/85 border border-bronze/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            {room.name}
          </span>
        </button>
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur text-white/80 text-[11px] tracking-widest px-4 py-2 border border-white/10 uppercase pointer-events-none">
        Clique em um ambiente para entrar no tour 360°
      </div>
    </div>
  );
}
