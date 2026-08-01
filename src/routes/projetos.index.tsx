import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projetos/")({
  head: () => ({
    meta: [
      { title: "Projetos — M7 Movelaria" },
      { name: "description", content: "Portfólio interativo de projetos de marcenaria de alto padrão executados pela M7 Movelaria." },
      { property: "og:title", content: "Projetos — M7 Movelaria" },
      { property: "og:description", content: "Explore ambientes com hotspots interativos de materiais e ferragens." },
      { property: "og:url", content: "https://project-envy-studio.lovable.app/projetos" },
    ],
    links: [{ rel: "canonical", href: "https://project-envy-studio.lovable.app/projetos" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Projetos — M7 Movelaria",
          url: "https://project-envy-studio.lovable.app/projetos",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: `https://project-envy-studio.lovable.app/projetos/${p.slug}`,
            })),
          },
        }),
      },
    ],
  }),
  component: ProjectsList,
});

function ProjectsList() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.4em] text-bronze mb-3">Portfólio</p>
        <h1 className="font-display text-5xl md:text-6xl mb-12">Projetos</h1>
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to="/projetos/$projectId"
              params={{ projectId: p.slug }}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-widest text-bronze">{p.architect}</p>
                <h2 className="font-display text-3xl mt-1 group-hover:text-bronze transition-colors">{p.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{p.client}</p>
                <p className="text-sm text-muted-foreground mt-3 max-w-md">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
