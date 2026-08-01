import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { getProject, type Ambiente, type Hotspot } from "@/data/projects";
import { X } from "lucide-react";

export const Route = createFileRoute("/projetos/$projectId")({
  loader: ({ params }) => {
    const project = getProject(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Projeto não encontrado — M7 Movelaria" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.name} — M7 Movelaria` },
        { name: "description", content: project.description },
        { property: "og:title", content: `${project.name} — M7 Movelaria` },
        { property: "og:description", content: project.description },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const [selected, setSelected] = useState<Ambiente>(project.ambientes[0]);
  const [hotspot, setHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="pt-24">
        <section className="max-w-7xl mx-auto px-6 py-8">
          <Link to="/projetos" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-bronze">
            ← Projetos
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-bronze">{project.architect}</p>
              <h1 className="font-display text-4xl md:text-6xl mt-2">{project.name}</h1>
              <p className="text-sm text-muted-foreground mt-2">Cliente: {project.client}</p>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">{project.description}</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[280px_1fr] gap-8 pb-16">
          {/* Ambientes list */}
          <aside className="space-y-2 lg:sticky lg:top-24 self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Ambientes</p>
            {project.ambientes.map((amb: Ambiente) => (
              <button
                key={amb.id}
                onClick={() => { setSelected(amb); setHotspot(null); }}
                className={`w-full text-left px-4 py-3 border transition-all ${
                  selected.id === amb.id
                    ? "border-bronze bg-bronze/10 text-bronze"
                    : "border-border/50 hover:border-bronze/50"
                }`}
              >
                <div className="font-display text-lg">{amb.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {amb.hotspots.length} pontos de detalhe
                </div>
              </button>
            ))}
          </aside>

          {/* Interactive room */}
          <div>
            <div className="relative w-full aspect-[16/10] overflow-hidden border border-border/50">
              <img
                src={selected.image}
                alt={selected.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
              {selected.hotspots.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setHotspot(h)}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  aria-label={h.name}
                >
                  <span className="relative flex items-center justify-center">
                    <span className="absolute w-10 h-10 rounded-full bg-bronze/30 animate-ping" />
                    <span className="relative w-6 h-6 rounded-full bg-bronze border-2 border-background shadow-lg" />
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap text-xs uppercase tracking-widest bg-background/90 border border-bronze/50 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {h.name}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <h2 className="font-display text-3xl">{selected.name}</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{selected.intro}</p>
              <p className="text-xs uppercase tracking-widest text-bronze mt-4">
                Toque nos pontos dourados para explorar os detalhes
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* Hotspot drawer */}
      {hotspot && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setHotspot(null)}>
          <div className="flex-1 bg-black/60 backdrop-blur-sm" />
          <div
            className="w-full max-w-md bg-card border-l border-bronze/40 h-full overflow-y-auto p-8 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-bronze">Detalhe</p>
                <h3 className="font-display text-3xl mt-2">{hotspot.name}</h3>
              </div>
              <button
                onClick={() => setHotspot(null)}
                className="p-2 hover:text-bronze transition-colors"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{hotspot.description}</p>

            <DetailBlock title="Materiais" items={hotspot.materials} />
            <DetailBlock title="Ferragens" items={hotspot.ferragens} />
            <DetailBlock title="Iluminação" items={hotspot.iluminacao} />
            <DetailBlock title="Diferenciais M7" items={hotspot.diferenciais} />
          </div>
        </div>
      )}
    </div>
  );
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-8">
      <h4 className="text-xs uppercase tracking-[0.3em] text-bronze mb-3 border-b border-bronze/30 pb-2">
        {title}
      </h4>
      <ul className="space-y-2 text-sm">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="text-bronze">—</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
