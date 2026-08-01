import { defineTool } from "@lovable.dev/mcp-js";

const FERRAGENS = [
  { name: "Corrediças ocultas Häfele com amortecedor", uso: "Gavetas de alto padrão com fechamento silencioso." },
  { name: "Dobradiças Salice clip reto", uso: "Portas de sobrepor total com folgas mínimas e esquadro perfeito." },
  { name: "Dobradiças ocultas Häfele", uso: "Portas de passagem e móveis sem batente aparente." },
  { name: "Fecho rolete Häfele", uso: "Fechamento discreto para portas sem puxador." },
  { name: "Cabideiro Vesto Rometal", uso: "Cabideiro iluminado para closets premium." },
  { name: "Puxadores Zen", uso: "Puxadores em dourado fosco, linha assinatura." },
  { name: "Kit RO-82 TOP Max Rometal", uso: "Portas de armário deslizantes com trilho superior embutido." },
  { name: "Kit Dominus", uso: "Portas de armário deslizantes de alto padrão." },
  { name: "Articuladores Häfele", uso: "Portas basculantes com abertura assistida." },
  { name: "Articuladores inversos FGV", uso: "Portas basculantes com curso invertido para painéis de TV." },
  { name: "Perfil de LED slim", uso: "Iluminação técnica embutida em prateleiras e nichos." },
  { name: "Fita de LED 3000K", uso: "Iluminação ambiente em tom quente padrão M7." },
  { name: "MDF 6, 15, 18 e 25 mm", uso: "Chapas em branco e cores para estrutura e acabamento." },
];

export default defineTool({
  name: "list_ferragens",
  title: "List ferragens padrão M7",
  description:
    "List the standard hardware, lighting, and materials M7 Movelaria uses on its projects (Häfele, Salice, Rometal, FGV, Zen, MDFs).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(FERRAGENS, null, 2) }],
    structuredContent: { ferragens: FERRAGENS },
  }),
});
