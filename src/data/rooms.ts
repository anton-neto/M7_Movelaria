import panoLiving from "@/assets/pano-living.jpg";
import panoKitchen from "@/assets/pano-kitchen.jpg";
import panoCloset from "@/assets/pano-closet.jpg";
import panoOffice from "@/assets/pano-office.jpg";
import panoDormitorio from "@/assets/pano-dormitorio.jpg";
import panoLavabo from "@/assets/pano-lavabo.jpg";
import panoAdega from "@/assets/pano-adega.jpg";
import panoHall from "@/assets/pano-hall.jpg";

/**
 * Hotspot posicionado por coordenadas esféricas.
 * yaw   → rotação horizontal em graus (0 = centro do panorama, +90 = direita)
 * pitch → rotação vertical em graus (0 = horizonte, + = acima, - = abaixo)
 */
export type Hotspot = {
  id: string;
  label: string;
  yaw: number;
  pitch: number;
  categoria: "Marcenaria" | "Ferragem" | "Iluminação" | "Acabamento";
  marca: string;
  modelo: string;
  detalhe: string;
};

export type Room = {
  id: string;
  name: string;
  tagline: string;
  panorama: string;
  cliente: string;
  materials: string[];
  ferragens: string[];
  hotspots: Hotspot[];
  /** Position on the isometric floor plan, in percentage (0–100). */
  x: number;
  y: number;
};

export const rooms: Room[] = [
  {
    id: "hall",
    name: "Hall de Entrada",
    tagline: "Muxarabi no teto · Espelho orgânico · Mármore Nero",
    panorama: panoHall,
    cliente: "Residência Aurora — Família Toledo",
    materials: ["Muxarabi em MDF Nogueira", "Mármore Nero Marquina", "Serralheria preta fosca"],
    ferragens: ["Fita LED 3000K", "Dobradiças ocultas Häfele"],
    hotspots: [
      {
        id: "muxarabi",
        label: "Muxarabi no teto",
        yaw: 0,
        pitch: 40,
        categoria: "Marcenaria",
        marca: "M7 Movelaria",
        modelo: "Painel muxarabi em MDF Nogueira 15mm — corte CNC",
        detalhe:
          "Padrão geométrico exclusivo com iluminação LED 3000K por trás, criando efeito de luz filtrada.",
      },
      {
        id: "espelho-hall",
        label: "Espelho orgânico",
        yaw: 0,
        pitch: 0,
        categoria: "Acabamento",
        marca: "M7 Serralheria",
        modelo: "Espelho orgânico com moldura em serralheria preta fosca",
        detalhe:
          "Formato assimétrico desenhado sob medida, moldura em aço 3mm pintura eletrostática.",
      },
      {
        id: "console-hall",
        label: "Aparador Nogueira",
        yaw: 0,
        pitch: -20,
        categoria: "Marcenaria",
        marca: "M7 Movelaria",
        modelo: "Aparador em MDF Nogueira 25mm — tampo maciço",
        detalhe: "Base escultural com acabamento verniz PU fosco de alta resistência.",
      },
    ],
    x: 50,
    y: 88,
  },
  {
    id: "sala",
    name: "Sala de Estar",
    tagline: "Painel Nogueira · LED 3000K · Home rack basculante",
    panorama: panoLiving,
    cliente: "Residência Aurora — Família Toledo",
    materials: ["MDF Nogueira Natural 18mm", "Couro caramelo", "Mármore Travertino"],
    ferragens: ["Articuladores inversos FGV", "Fecho rolete Häfele", "Perfil de LED slim"],
    hotspots: [
      {
        id: "painel",
        label: "Painel TV Nogueira",
        yaw: -20,
        pitch: 2,
        categoria: "Marcenaria",
        marca: "M7 Movelaria",
        modelo: "MDF Nogueira Natural 18mm — ripado vertical",
        detalhe: "Painel executado em meia esquadria 45° com acabamento verniz PU fosco.",
      },
      {
        id: "led-painel",
        label: "Iluminação LED 3000K",
        yaw: -20,
        pitch: 22,
        categoria: "Iluminação",
        marca: "Brilia / M7",
        modelo: "Perfil de LED slim embutido · 3000K",
        detalhe: "Fita LED 24V em perfil de alumínio anodizado, luz quente contínua.",
      },
      {
        id: "home-basculante",
        label: "Home Rack basculante",
        yaw: 25,
        pitch: -8,
        categoria: "Ferragem",
        marca: "Häfele / FGV",
        modelo: "Articulador inverso FGV + fecho rolete Häfele",
        detalhe: "Portas basculantes com amortecimento suave e fechamento silencioso.",
      },
    ],
    x: 78,
    y: 48,
  },
  {
    id: "cozinha",
    name: "Cozinha Gourmet",
    tagline: "Ilha em mármore · Iluminação técnica · Laca fosca",
    panorama: panoKitchen,
    cliente: "Residência Aurora — Família Toledo",
    materials: ["MDF laca fosca", "Mármore Nero", "MDF Nogueira 25mm"],
    ferragens: ["Dobradiças ocultas Häfele", "Corrediças ocultas amortecidas", "Puxadores Zen"],
    hotspots: [
      {
        id: "ilha",
        label: "Ilha em Mármore Nero",
        yaw: 0,
        pitch: -25,
        categoria: "Acabamento",
        marca: "Mármore Nero Marquina",
        modelo: "Tampo 30mm com acabamento polido",
        detalhe: "Bordas em meia esquadria dando efeito monolítico à ilha.",
      },
      {
        id: "aereo",
        label: "Aéreos em Laca Fosca",
        yaw: -40,
        pitch: 15,
        categoria: "Marcenaria",
        marca: "M7 Movelaria",
        modelo: "MDF 18mm com pintura laca PU fosco",
        detalhe: "Dobradiças ocultas Häfele com amortecimento integrado.",
      },
      {
        id: "corredicas",
        label: "Gavetas Häfele",
        yaw: 30,
        pitch: -10,
        categoria: "Ferragem",
        marca: "Häfele",
        modelo: "Corrediças ocultas amortecidas — extensão total",
        detalhe: "Frentes em MDF Nogueira 25mm com puxador cava.",
      },
      {
        id: "led-cozinha",
        label: "LED técnico 3000K",
        yaw: -40,
        pitch: 32,
        categoria: "Iluminação",
        marca: "M7",
        modelo: "Fita LED 3000K sob aéreo",
        detalhe: "Iluminação técnica de bancada com IRC 90+.",
      },
    ],
    x: 55,
    y: 68,
  },
  {
    id: "lavabo",
    name: "Lavabo",
    tagline: "Mármore Nero · Espelho backlit · Cuba esculpida",
    panorama: panoLavabo,
    cliente: "Residência Aurora — Família Toledo",
    materials: ["Mármore Nero Marquina", "MDF Nogueira 18mm", "Metais em latão escovado"],
    ferragens: ["Fita LED 3000K backlit", "Dobradiças ocultas Häfele"],
    hotspots: [
      {
        id: "espelho-lavabo",
        label: "Espelho orgânico backlit",
        yaw: 0,
        pitch: 8,
        categoria: "Iluminação",
        marca: "M7 / Brilia",
        modelo: "Fita LED 3000K perimetral com difusor leitoso",
        detalhe: "Espelho orgânico com halo de luz difusa 3000K — efeito flutuante.",
      },
      {
        id: "vanity",
        label: "Vanity suspenso Nogueira",
        yaw: 0,
        pitch: -20,
        categoria: "Marcenaria",
        marca: "M7 Movelaria",
        modelo: "MDF Nogueira 25mm com corte curvo CNC",
        detalhe: "Bancada suspensa com cuba de apoio em pedra sabão esculpida.",
      },
      {
        id: "marmore-lavabo",
        label: "Revestimento Nero Marquina",
        yaw: 0,
        pitch: 25,
        categoria: "Acabamento",
        marca: "Mármore Nero Marquina",
        modelo: "Placas 12mm com juntas milimétricas",
        detalhe: "Aplicação em parede única book-match para desenho contínuo do veio.",
      },
    ],
    x: 30,
    y: 82,
  },
  {
    id: "dormitorio",
    name: "Dormitório Master",
    tagline: "Cabeceira estofada · Painel ripado · LED 3000K",
    panorama: panoDormitorio,
    cliente: "Residência Aurora — Família Toledo",
    materials: ["Cabeceira estofada linho", "MDF Nogueira ripado", "Piso Nogueira engenheirado"],
    ferragens: ["Corrediças ocultas Häfele", "Perfil de LED slim 3000K", "Dobradiças Salice"],
    hotspots: [
      {
        id: "cabeceira",
        label: "Cabeceira Estofada",
        yaw: 0,
        pitch: 0,
        categoria: "Marcenaria",
        marca: "M7 Movelaria",
        modelo: "Estofado em linho premium com capitonê discreto",
        detalhe: "Estrutura em MDF 18mm com espuma D33 e revestimento tensionado à mão.",
      },
      {
        id: "painel-ripado",
        label: "Painel Ripado Nogueira",
        yaw: 5,
        pitch: 12,
        categoria: "Marcenaria",
        marca: "M7 Movelaria",
        modelo: "Ripado vertical MDF Nogueira 18mm",
        detalhe: "Ripas em meia esquadria com acabamento verniz PU fosco.",
      },
      {
        id: "closet-dorm",
        label: "Closet integrado",
        yaw: 125,
        pitch: 0,
        categoria: "Ferragem",
        marca: "Rometal",
        modelo: "Kit deslizante RO82 Top Max",
        detalhe:
          "Portas de correr em vidro fumê com perfil preto fosco e cabideiro Vesto iluminado.",
      },
    ],
    x: 20,
    y: 30,
  },
  {
    id: "closet",
    name: "Closet Master",
    tagline: "Cabideiro Vesto iluminado · Vitrines em serralheria",
    panorama: panoCloset,
    cliente: "Residência Aurora — Família Toledo",
    materials: ["MDF Nogueira 18mm", "Vidro fumê", "Serralheria preta fosca"],
    ferragens: ["Cabideiro Vesto Rometal", "Dobradiças Salice clip reto", "LED 3000K"],
    hotspots: [
      {
        id: "cabideiro",
        label: "Cabideiro Vesto",
        yaw: 117,
        pitch: 5,
        categoria: "Ferragem",
        marca: "Rometal",
        modelo: "Cabideiro Vesto iluminado — perfil retangular",
        detalhe: "Estrutura em alumínio preto fosco com LED 3000K integrado.",
      },
      {
        id: "vitrine",
        label: "Vitrine em Serralheria",
        yaw: -126,
        pitch: 0,
        categoria: "Acabamento",
        marca: "M7 Serralheria",
        modelo: "Perfil preto fosco + vidro fumê 6mm",
        detalhe: "Vitrines de alta joalheria com dobradiças Salice clip reto.",
      },
      {
        id: "led-closet",
        label: "LED perimetral",
        yaw: 0,
        pitch: 30,
        categoria: "Iluminação",
        marca: "M7",
        modelo: "Perfil slim 3000K",
        detalhe: "Iluminação embutida no forro criando efeito de vitrine premium.",
      },
    ],
    x: 38,
    y: 25,
  },
  {
    id: "escritorio",
    name: "Escritório",
    tagline: "Estante iluminada · Marcenaria executiva",
    panorama: panoOffice,
    cliente: "Residência Aurora — Família Toledo",
    materials: ["MDF Nogueira 18mm", "Vidro fumê", "Couro capitonê"],
    ferragens: ["Perfil de LED slim", "Dobradiças Salice", "Puxadores Zen"],
    hotspots: [
      {
        id: "estante",
        label: "Estante iluminada",
        yaw: -47,
        pitch: 8,
        categoria: "Marcenaria",
        marca: "M7 Movelaria",
        modelo: "MDF Nogueira 18mm + vidro fumê",
        detalhe: "Prateleiras com perfil de LED slim 3000K contínuo.",
      },
      {
        id: "mesa",
        label: "Mesa executiva",
        yaw: 20,
        pitch: -20,
        categoria: "Acabamento",
        marca: "M7 Movelaria",
        modelo: "Tampo Nogueira 25mm + base em serralheria preta",
        detalhe: "Acabamento verniz PU fosco de alta resistência.",
      },
      {
        id: "puxador",
        label: "Puxadores Zen",
        yaw: 20,
        pitch: 5,
        categoria: "Ferragem",
        marca: "Zen Design",
        modelo: "Puxador linear em latão escovado",
        detalhe: "Aplicado em gavetas com corrediças ocultas Häfele.",
      },
    ],
    x: 15,
    y: 55,
  },
  {
    id: "adega",
    name: "Adega Climatizada",
    tagline: "Estante Nogueira · Vidro serralheria · LED 3000K bottle wash",
    panorama: panoAdega,
    cliente: "Residência Aurora — Família Toledo",
    materials: ["MDF Nogueira 25mm", "Vidro temperado 8mm", "Serralheria preta fosca"],
    ferragens: ["LED 3000K bottle wash", "Dobradiças Salice pivotantes"],
    hotspots: [
      {
        id: "racks-adega",
        label: "Racks em Nogueira",
        yaw: -65,
        pitch: 0,
        categoria: "Marcenaria",
        marca: "M7 Movelaria",
        modelo: "MDF Nogueira 25mm com nichos individuais",
        detalhe:
          "Nichos calculados para garrafas Bordeaux e Borgonha, com LED 3000K por prateleira.",
      },
      {
        id: "mesa-adega",
        label: "Mesa degustação",
        yaw: 0,
        pitch: -25,
        categoria: "Acabamento",
        marca: "M7 Movelaria",
        modelo: "Tampo Nogueira maciço 40mm — base escultural",
        detalhe: "Peça central com acabamento óleo natural e base em serralheria preta.",
      },
      {
        id: "vidro-adega",
        label: "Fechamento em serralheria",
        yaw: 128,
        pitch: 0,
        categoria: "Ferragem",
        marca: "M7 Serralheria",
        modelo: "Perfil preto fosco + vidro temperado 8mm",
        detalhe:
          "Portas pivotantes com dobradiças Salice de alta carga, vedação para climatização.",
      },
    ],
    x: 70,
    y: 22,
  },
];
