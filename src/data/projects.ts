import heroLiving from "@/assets/hero-living.jpg";
import projectCloset from "@/assets/project-closet.jpg";
import projectKitchen from "@/assets/project-kitchen.jpg";
import projectOffice from "@/assets/project-office.jpg";

export type Hotspot = {
  id: string;
  name: string;
  // percent coordinates on the room image (0-100)
  x: number;
  y: number;
  description: string;
  materials: string[];
  ferragens: string[];
  iluminacao: string[];
  diferenciais: string[];
};

export type Ambiente = {
  id: string;
  name: string;
  // percent coordinates on the floor plan (0-100)
  planX: number;
  planY: number;
  image: string;
  intro: string;
  hotspots: Hotspot[];
};

export type Project = {
  slug: string;
  name: string;
  client: string;
  architect: string;
  cover: string;
  description: string;
  ambientes: Ambiente[];
};

export const projects: Project[] = [
  {
    slug: "residencia-aurora",
    name: "Residência Aurora",
    client: "Família Almeida",
    architect: "Studio Larissa Tortato",
    cover: heroLiving,
    description:
      "Projeto residencial de alto padrão com marcenaria integrada em madeira nogueira e detalhes em dourado fosco.",
    ambientes: [
      {
        id: "sala",
        name: "Sala de Estar",
        planX: 28,
        planY: 42,
        image: heroLiving,
        intro:
          "Ambiente principal com painel de TV em MDF Nogueira, home rack basculante e prateleiras iluminadas.",
        hotspots: [
          {
            id: "painel-tv",
            name: "Painel de TV",
            x: 62,
            y: 42,
            description:
              "Painel executado em MDF Nogueira 18mm com nichos ripados e iluminação embutida em perfil de LED.",
            materials: ["MDF Nogueira Natural 18mm", "MDF Preto TX 18mm"],
            ferragens: ["Articuladores inversos FGV", "Fecho rolete Häfele"],
            iluminacao: ["Perfil de LED slim", "Fita de LED 3000K"],
            diferenciais: ["Passagem oculta de cabos", "Nichos ripados sob medida"],
          },
          {
            id: "home-rack",
            name: "Home Rack",
            x: 55,
            y: 72,
            description:
              "Balcão inferior com três portas basculantes equipadas com articuladores inversos.",
            materials: ["MDF Nogueira 18mm", "Interno Branco TX Ultra"],
            ferragens: ["Articuladores Häfele", "Puxadores Zen dourado fosco"],
            iluminacao: ["LED 3000K interno"],
            diferenciais: ["Abertura basculante silenciosa", "Ventilação técnica"],
          },
        ],
      },
      {
        id: "cozinha",
        name: "Cozinha Gourmet",
        planX: 62,
        planY: 40,
        image: projectKitchen,
        intro:
          "Cozinha com armários em laca fosca, ilha em quartzo e iluminação técnica sob os aéreos.",
        hotspots: [
          {
            id: "aereos",
            name: "Armários Aéreos",
            x: 50,
            y: 30,
            description:
              "Aéreos em laca fosca com iluminação técnica integrada sob a estrutura.",
            materials: ["MDF 18mm com pintura laca fosca", "Interno Branco TX Ultra"],
            ferragens: ["Dobradiças ocultas Häfele", "Articuladores Häfele"],
            iluminacao: ["Perfil de LED slim", "Fita de LED 3000K"],
            diferenciais: ["Portas basculantes", "Iluminação técnica sob aéreo"],
          },
          {
            id: "ilha",
            name: "Ilha Central",
            x: 50,
            y: 72,
            description: "Ilha com tampo em quartzo e gavetas com corrediças ocultas Häfele.",
            materials: ["MDF Nogueira 25mm", "Tampo em quartzo branco"],
            ferragens: ["Corrediças ocultas Häfele com amortecedor", "Puxadores Zen"],
            iluminacao: ["Spots direcionais"],
            diferenciais: ["Gavetas organizadoras", "Tomadas retráteis"],
          },
        ],
      },
      {
        id: "closet",
        name: "Closet Master",
        planX: 30,
        planY: 74,
        image: projectCloset,
        intro:
          "Closet com cabideiros iluminados, gavetas internas e vitrines em vidro fumê com serralheria.",
        hotspots: [
          {
            id: "cabideiro",
            name: "Cabideiro Iluminado",
            x: 45,
            y: 45,
            description:
              "Cabideiro Vesto Rometal com iluminação integrada em LED 3000K.",
            materials: ["MDF Nogueira 18mm", "Interno Preto TX"],
            ferragens: ["Cabideiro Vesto Rometal", "Dobradiças Salice clip reto"],
            iluminacao: ["LED 3000K embutido no cabideiro"],
            diferenciais: ["Iluminação automática", "Varão dourado fosco"],
          },
          {
            id: "gaveteiro",
            name: "Gaveteiro",
            x: 20,
            y: 70,
            description:
              "Gaveteiro com corrediças ocultas Häfele e divisores internos organizadores.",
            materials: ["MDF Nogueira 18mm"],
            ferragens: ["Corrediças ocultas Häfele com amortecedor"],
            iluminacao: ["LED interno com sensor de presença"],
            diferenciais: ["Divisores organizadores", "Abertura tip-on"],
          },
        ],
      },
      {
        id: "escritorio",
        name: "Escritório",
        planX: 70,
        planY: 72,
        image: projectOffice,
        intro:
          "Escritório com estante iluminada, mesa em MDF Nogueira e vitrines em serralheria preta.",
        hotspots: [
          {
            id: "estante",
            name: "Estante Iluminada",
            x: 50,
            y: 40,
            description:
              "Estante com prateleiras iluminadas em perfil de LED slim e portas em vidro fumê.",
            materials: ["MDF Nogueira 18mm", "Vidro fumê"],
            ferragens: ["Dobradiças Salice clip reto", "Puxadores Zen"],
            iluminacao: ["Perfil de LED slim", "Fita de LED 3000K"],
            diferenciais: ["Prateleiras iluminadas individualmente"],
          },
        ],
      },
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
