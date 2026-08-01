import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Instagram, Facebook, Mail, Clock } from "lucide-react";
import { whatsappLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

const nav = [
  { label: "Início", to: "/", hash: "inicio" },
  { label: "Sobre", to: "/", hash: "sobre" },
  { label: "Serviços", to: "/", hash: "servicos" },
  { label: "Showroom 3D", to: "/showroom-3d" as const, hash: undefined },
  { label: "Portfólio", to: "/", hash: "portfolio" },
  { label: "Depoimentos", to: "/", hash: "depoimentos" },
  { label: "Contato", to: "/contato" as const, hash: undefined },
];

function formatPhone(raw: string) {
  // 5541999999999 -> (41) 99999-9999
  const n = raw.replace(/\D/g, "");
  const local = n.startsWith("55") ? n.slice(2) : n;
  const ddd = local.slice(0, 2);
  const rest = local.slice(2);
  if (rest.length === 9) return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
  return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
}

export function SiteHeader() {
  const phone = formatPhone(WHATSAPP_NUMBER);
  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-background">
      {/* Top bar */}
      <div className="bg-cream border-b border-border/60 text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-bronze" />
              R. Orestes Fogiato, 710 — São José dos Pinhais - PR
            </span>
            <span className="hidden md:flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-bronze" />
              {phone}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="hover:text-bronze"><Instagram className="w-3.5 h-3.5" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-bronze"><Facebook className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>
      {/* Main nav */}
      <div className="border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-3xl text-bronze tracking-widest">M7</span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mt-1">
              Movelaria
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                hash={n.hash}
                className="text-ink hover:text-bronze transition-colors"
                activeProps={{ className: "text-bronze" }}
                activeOptions={{ exact: n.to === "/" && !n.hash }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <a
            href={whatsappLink("Olá M7 Movelaria, gostaria de solicitar um orçamento.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-6 py-3 bg-bronze text-primary-foreground text-sm font-medium rounded hover:bg-bronze-dark transition-colors"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const phone = formatPhone(WHATSAPP_NUMBER);
  return (
    <footer className="bg-ink text-white/80 mt-0">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4 text-sm">
        <div>
          <div className="font-display text-3xl text-bronze tracking-widest">M7</div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 mt-1 mb-4">Movelaria</div>
          <p className="text-white/60 max-w-xs">
            Móveis sob medida com qualidade e funcionalidade para transformar seus ambientes.
          </p>
        </div>
        <div>
          <h4 className="text-bronze uppercase tracking-widest text-xs mb-4">Navegação</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link to="/" hash="inicio" className="hover:text-bronze">Início</Link></li>
            <li><Link to="/" hash="sobre" className="hover:text-bronze">Sobre</Link></li>
            <li><Link to="/" hash="servicos" className="hover:text-bronze">Serviços</Link></li>
            <li><Link to="/showroom-3d" className="hover:text-bronze">Showroom 3D</Link></li>
            <li><Link to="/" hash="portfolio" className="hover:text-bronze">Portfólio</Link></li>
            <li><Link to="/" hash="depoimentos" className="hover:text-bronze">Depoimentos</Link></li>
            <li><Link to="/contato" className="hover:text-bronze">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-bronze uppercase tracking-widest text-xs mb-4">Serviços</h4>
          <ul className="space-y-2 text-white/70">
            <li>Móveis Planejados</li>
            <li>Cozinhas</li>
            <li>Dormitórios</li>
            <li>Escritórios</li>
            <li>Comerciais</li>
          </ul>
        </div>
        <div>
          <h4 className="text-bronze uppercase tracking-widest text-xs mb-4">Contato</h4>
          <ul className="space-y-3 text-white/70">
            <li className="flex gap-2"><MapPin className="w-4 h-4 text-bronze shrink-0 mt-0.5" /> R. Orestes Fogiato, 710 — São José dos Pinhais - PR</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 text-bronze shrink-0 mt-0.5" /> {phone}</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 text-bronze shrink-0 mt-0.5" /> m7movelaria@outlook.com.br</li>
            <li className="flex gap-2"><Clock className="w-4 h-4 text-bronze shrink-0 mt-0.5" /> Seg - Sex: 8h às 18h · Sáb: 8h às 12h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} M7 Movelaria. Todos os direitos reservados.
      </div>
    </footer>
  );
}
