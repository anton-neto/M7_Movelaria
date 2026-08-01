import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutGrid, Package, Truck, ArrowRight, Check,
  Ruler, ChefHat, BedDouble, Briefcase, Store,
  Sparkles, Layers, Palette, Users, Heart, Star,
  MessageCircle, Calendar, ChevronLeft, ChevronRight, Play,
} from "lucide-react";
import { useState } from "react";
import heroShowroom from "@/assets/hero-showroom-3d.jpg";
import heroVideo from "@/assets/hero-showroom.mp4.asset.json";
import projectCloset from "@/assets/project-closet.jpg";
import projectKitchen from "@/assets/project-kitchen.jpg";
import projectOffice from "@/assets/project-office.jpg";
import heroLiving from "@/assets/hero-living.jpg";
import hwBlum from "@/assets/hw-blum.jpg";
import hwHafele from "@/assets/hw-hafele.jpg";
import hwSalice from "@/assets/hw-salice.jpg";
import hwSiforma from "@/assets/hw-siforma.jpg";
import hwRometal from "@/assets/hw-rometal.jpg";
import hwMdf from "@/assets/hw-mdf.jpg";
import finishLamina from "@/assets/finish-lamina-45.jpg";
import finishLaca from "@/assets/finish-laca.jpg";
import finishSerralheria from "@/assets/finish-serralheria.jpg";
import finishLed3000 from "@/assets/finish-led-3000.jpg";
import finishLed5000 from "@/assets/finish-led-5000.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { whatsappLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M7 Movelaria — Móveis Planejados em São José dos Pinhais" },
      { name: "description", content: "M7 Movelaria: móveis planejados sob medida com qualidade, design e acabamento impecável. Cozinhas, dormitórios, escritórios e ambientes comerciais." },
      { property: "og:title", content: "M7 Movelaria — Móveis Planejados Sob Medida" },
      { property: "og:description", content: "Soluções personalizadas em móveis planejados. Do seu jeito. Para o seu espaço." },
      { property: "og:url", content: "https://project-envy-studio.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://project-envy-studio.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "M7 Movelaria",
          image: "https://project-envy-studio.lovable.app/favicon.svg",
          url: "https://project-envy-studio.lovable.app/",
          telephone: "+55 41 98711-6308",
          address: {
            "@type": "PostalAddress",
            streetAddress: "R. Orestes Fogiato, 710",
            addressLocality: "São José dos Pinhais",
            addressRegion: "PR",
            addressCountry: "BR",
          },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "12:00" },
          ],
          description: "Móveis planejados sob medida de alto padrão — cozinhas, dormitórios, closets, escritórios e ambientes comerciais.",
          areaServed: "BR",
        }),
      },
    ],
  }),
  component: Home,
});

const services = [
  { icon: LayoutGrid, title: "Móveis Planejados", desc: "Projetos personalizados para cada ambiente da sua casa ou empresa." },
  { icon: ChefHat, title: "Cozinhas", desc: "Funcionalidade e beleza para o coração do seu lar." },
  { icon: BedDouble, title: "Dormitórios", desc: "Ambientes planejados para mais conforto e organização." },
  { icon: Briefcase, title: "Escritórios", desc: "Móveis sob medida que inspiram produtividade." },
  { icon: Store, title: "Comerciais", desc: "Soluções completas para lojas, recepções e empresas." },
];

const portfolio = [
  { img: heroLiving, alt: "Cozinha planejada" },
  { img: projectCloset, alt: "Home theater sob medida" },
  { img: projectKitchen, alt: "Cozinha compacta" },
  { img: projectOffice, alt: "Escritório planejado" },
  { img: heroLiving, alt: "Dormitório planejado" },
];

const differentials = [
  { icon: Sparkles, title: "Projeto Exclusivo", desc: "Cada projeto é único, feito para seu espaço." },
  { icon: Layers, title: "Materiais Premium", desc: "Trabalhamos com materiais de alta qualidade." },
  { icon: Palette, title: "Acabamento Impecável", desc: "Detalhes que fazem toda a diferença." },
  { icon: Users, title: "Equipe Especializada", desc: "Profissionais experientes em cada etapa." },
  { icon: Heart, title: "Pós-venda Garantido", desc: "Suporte e garantia para sua tranquilidade." },
];

const hardware = [
  { img: hwBlum, name: "Blum", desc: "Dobradiças e corrediças austríacas com abertura silenciosa e vida útil superior." },
  { img: hwHafele, name: "Häfele", desc: "Ferragens alemãs de alta engenharia — corrediças ocultas, articuladores e sistemas de porta." },
  { img: hwSalice, name: "Salice", desc: "Dobradiças italianas premium com clip reto para portas de sobrepor perfeitas." },
  { img: hwSiforma, name: "Siforma", desc: "Perfis e sistemas de portas deslizantes com movimento suave e acabamento refinado." },
  { img: hwRometal, name: "Rometal", desc: "Kits de portas deslizantes e cabideiros iluminados — engenharia nacional de alto padrão." },
  { img: hwMdf, name: "Chapas de MDF", desc: "MDF 6, 15, 18 e 25 mm em branco e cores — estrutura estável e acabamento superior." },
];

const finishes = [
  { img: finishLamina, name: "Lâmina 45°", desc: "Encaixes em 45 graus com lâmina natural — continuidade de veio e cantos vivos." },
  { img: finishLaca, name: "Laca fosca", desc: "Pintura em laca com toque aveludado e superfície uniforme sem emendas." },
  { img: finishSerralheria, name: "Serralheria", desc: "Estruturas metálicas sob medida integradas ao mobiliário — leveza industrial." },
  { img: finishLed3000, name: "LED 3000K", desc: "Luz quente amarelada — cria aconchego em ambientes de convívio e cozinhas." },
  { img: finishLed5000, name: "LED 5000K", desc: "Luz branca neutra — funcional para closets, bancadas e áreas de trabalho." },
];

const testimonials = [
  { name: "Juliana Souza", city: "São José dos Pinhais - PR", avatar: avatar1, text: "Excelente trabalho! A M7 superou nossas expectativas em todos os detalhes. Os acabamentos em laca ficaram impecáveis." },
  { name: "Carlos Mendes", city: "Curitiba - PR", avatar: avatar2, text: "Profissionais atenciosos e comprometidos. Nosso projeto ficou perfeito e no prazo combinado!" },
  { name: "Fernanda Lima", city: "Pinhais - PR", avatar: avatar3, text: "Qualidade impecável. As ferragens Blum e Häfele fazem toda a diferença no dia a dia. Recomendo!" },
  { name: "Rafael Oliveira", city: "Curitiba - PR", avatar: avatar4, text: "Como arquiteto, valorizo a execução técnica. A M7 entrega exatamente o que projetamos, com precisão milimétrica." },
  { name: "Patrícia Almeida", city: "São José dos Pinhais - PR", avatar: avatar5, text: "Do primeiro atendimento à instalação, foi tudo cuidadoso. A cozinha ficou dos meus sonhos!" },
  { name: "Bruno Ferreira", city: "Araucária - PR", avatar: avatar6, text: "Home office montado com perfeição. Iluminação LED 3000K, laca fosca e detalhes de serralheria — sofisticado." },
];

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6C12.3 13.3 17.7 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.9-10 6.9-17.5z"/>
      <path fill="#FBBC05" d="M10.4 28.8c-1-3-1-6.3 0-9.3l-7.8-6C-.9 19.4-.9 28.6 2.6 34.8l7.8-6z"/>
      <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2.1 1.4-4.8 2.3-7.7 2.3-6.3 0-11.7-3.8-13.6-9.7l-7.8 6C6.5 42.6 14.6 48 24 48z"/>
    </svg>
  );
}

function Home() {
  const [tIndex, setTIndex] = useState(0);
  const prev = () => setTIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setTIndex((i) => (i + 1) % testimonials.length);
  const visible = [testimonials[tIndex], testimonials[(tIndex + 1) % testimonials.length], testimonials[(tIndex + 2) % testimonials.length]];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* HERO */}
        <section id="inicio" className="bg-cream">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center px-6 py-16 lg:py-24">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-bronze mb-5">Móveis sob medida</p>
              <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] text-ink">
                Móveis Planejados de <span className="text-bronze italic font-display font-medium">Alto Padrão</span> sob medida
              </h1>
              <p className="mt-6 text-muted-foreground max-w-lg">
                Soluções personalizadas em móveis planejados com qualidade, design e acabamento impecável.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/" hash="portfolio" className="inline-flex items-center gap-2 px-6 py-3 bg-bronze text-primary-foreground rounded hover:bg-bronze-dark transition-colors">
                  Ver Portfólio <LayoutGrid className="w-4 h-4" />
                </Link>
                <a
                  href={whatsappLink("Olá M7 Movelaria, gostaria de solicitar um orçamento.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-bronze text-bronze rounded hover:bg-bronze hover:text-primary-foreground transition-colors"
                >
                  Falar no WhatsApp <MessageCircle className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Ruler className="w-4 h-4 text-bronze" /> Projetos Personalizados</span>
                <span className="flex items-center gap-2"><Package className="w-4 h-4 text-bronze" /> Materiais de Qualidade</span>
                <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-bronze" /> Entrega & Instalação</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded shadow-lg bg-ink group">
              <video
                src={heroVideo.url}
                poster={heroShowroom}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur text-white text-[10px] uppercase tracking-[0.25em] rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
                Tour 360° · Ambientes Reais
              </div>
              <Link
                to="/showroom-3d"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 bg-bronze text-primary-foreground text-xs rounded hover:bg-bronze-dark transition-colors"
              >
                <Play className="w-3 h-3 fill-current" /> Entrar no tour 360°
              </Link>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded shadow-md">
              <img src={projectCloset} alt="Home theater sob medida" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-bronze mb-3">Sobre a M7</p>
              <h2 className="text-4xl md:text-5xl font-bold text-ink leading-tight">
                Transformamos ambientes<br /> em experiências únicas.
              </h2>
              <p className="mt-6 text-muted-foreground">
                A M7 Movelaria é especializada em móveis sob medida para residências e empresas.
                Atuamos com excelência do projeto à instalação, garantindo funcionalidade, beleza e durabilidade.
              </p>
              <ul className="mt-8 space-y-3">
                {["Atendimento consultivo e humanizado", "Projeto 100% personalizado", "Prazos cumpridos e garantia"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-ink">
                    <span className="w-6 h-6 rounded-full bg-bronze/15 text-bronze grid place-items-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link to="/" hash="servicos" className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-bronze text-primary-foreground rounded hover:bg-bronze-dark transition-colors">
                Conheça mais sobre nós <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-bronze mb-3">Nossos Serviços</p>
            <h2 className="text-4xl md:text-5xl font-bold text-ink">Soluções completas em movelaria</h2>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {services.map((s) => (
                <div key={s.title} className="bg-background border border-border rounded p-6 text-center hover:border-bronze/60 hover:shadow-md transition-all">
                  <div className="w-14 h-14 mx-auto rounded-full bg-bronze/10 grid place-items-center text-bronze">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 font-semibold text-ink text-base">{s.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/projetos" className="inline-flex items-center gap-2 px-6 py-3 bg-bronze text-primary-foreground rounded hover:bg-bronze-dark transition-colors text-sm">
                Ver todos os serviços <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SHOWROOM 3D CTA */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 rounded overflow-hidden shadow-lg">
              <div className="aspect-[4/3] md:aspect-auto">
                <img src={projectKitchen} alt="Showroom 3D interativo" className="w-full h-full object-cover" />
              </div>
              <div className="bg-ink text-white p-10 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.4em] text-bronze mb-3">Showroom 3D</p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">Explore nossos projetos em detalhes interativos</h2>
                <p className="mt-4 text-white/70">
                  Navegue por ambientes reais executados pela M7. Clique nos hotspots dourados para descobrir
                  materiais, ferragens Häfele, iluminação e cada detalhe técnico do projeto.
                </p>
                <Link to="/showroom-3d" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-bronze text-primary-foreground rounded hover:bg-bronze-dark transition-colors self-start">
                  Entrar no Showroom 3D 360° <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MATERIAIS PREMIUM — FERRAGENS */}
        <section id="materiais" className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-bronze mb-3">Materiais Premium</p>
              <h2 className="text-4xl md:text-5xl font-bold text-ink">Ferragens das melhores marcas do mundo</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Cada projeto M7 é executado com ferragens importadas de fabricantes reconhecidos mundialmente
                pela engenharia, durabilidade e acabamento.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {hardware.map((h) => (
                <div key={h.name} className="bg-background border border-border rounded overflow-hidden hover:border-bronze/60 hover:shadow-md transition-all">
                  <div className="aspect-square overflow-hidden bg-white">
                    <img src={h.img} alt={`Ferragem ${h.name}`} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-ink">{h.name}</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ACABAMENTOS */}
        <section id="acabamentos" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-bronze mb-3">Acabamentos</p>
              <h2 className="text-4xl md:text-5xl font-bold text-ink">Detalhes que definem o alto padrão</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Da lâmina natural em 45° à iluminação técnica em LED — cada acabamento é escolhido para
                elevar o resultado final.
              </p>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {finishes.map((f, i) => (
                <div
                  key={f.name}
                  className={`group relative overflow-hidden rounded shadow-sm ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                >
                  <div className={`${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"} overflow-hidden`}>
                    <img
                      src={f.img}
                      alt={f.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-bronze">Acabamento</p>
                    <h3 className={`font-display ${i === 0 ? "text-2xl" : "text-lg"} mt-1`}>{f.name}</h3>
                    <p className="text-xs text-white/80 mt-1 max-w-md">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFÓLIO */}
        <section id="portfolio" className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-bronze mb-3">Portfólio</p>
            <h2 className="text-4xl md:text-5xl font-bold text-ink">Veja alguns de nossos trabalhos</h2>
            <div className="mt-12 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {portfolio.map((p, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded group cursor-pointer">
                  <img src={p.img} alt={p.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/projetos" className="inline-flex items-center gap-2 px-6 py-3 bg-bronze text-primary-foreground rounded hover:bg-bronze-dark transition-colors text-sm">
                Ver mais projetos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* POR QUE ESCOLHER */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-bronze mb-3">Por que escolher a M7?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-ink">Qualidade que faz a diferença</h2>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {differentials.map((d) => (
                <div key={d.title} className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-bronze/10 grid place-items-center text-bronze">
                    <d.icon className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 font-semibold text-ink text-base">{d.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed max-w-[200px] mx-auto">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section id="depoimentos" className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-bronze mb-3">Depoimentos</p>
              <h2 className="text-4xl md:text-5xl font-bold text-ink">O que nossos clientes dizem</h2>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <GoogleG />
                <span className="font-semibold text-ink">4,9</span>
                <span className="flex text-bronze">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-current" />)}
                </span>
                <span>· Avaliações Google</span>
              </div>
            </div>
            <div className="mt-12 flex items-center gap-4">
              <button onClick={prev} aria-label="Anterior" className="w-10 h-10 rounded-full border border-border bg-background grid place-items-center hover:border-bronze hover:text-bronze transition-colors shrink-0">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="grid gap-5 md:grid-cols-3 flex-1">
                {visible.map((t, i) => (
                  <div key={i} className="bg-background border border-border rounded p-6 text-left flex flex-col">
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} loading="lazy" className="w-11 h-11 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <div className="font-semibold text-ink text-sm truncate">{t.name}</div>
                          <GoogleG />
                        </div>
                        <div className="text-[11px] text-muted-foreground truncate">{t.city}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-bronze mt-4">
                      {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-current" />)}
                      <span className="ml-2 text-[11px] text-muted-foreground">há 2 meses</span>
                    </div>
                    <p className="text-sm text-ink mt-3 leading-relaxed">{t.text}</p>
                  </div>
                ))}
              </div>
              <button onClick={next} aria-label="Próximo" className="w-10 h-10 rounded-full border border-border bg-background grid place-items-center hover:border-bronze hover:text-bronze transition-colors shrink-0">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-bronze text-primary-foreground">
          <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-[auto_1fr_auto] items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-white/15 grid place-items-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Vamos criar juntos o ambiente dos seus sonhos?</h3>
              <p className="text-white/80 text-sm mt-1">Fale com nossa equipe e ganhe um orçamento personalizado.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-bronze rounded font-medium hover:bg-white/90 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" /> (41) 98711-6308
              </a>
              <a
                href={whatsappLink("Olá M7 Movelaria, gostaria de solicitar um orçamento.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/60 rounded font-medium hover:bg-white/10 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" /> Solicitar Orçamento
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
