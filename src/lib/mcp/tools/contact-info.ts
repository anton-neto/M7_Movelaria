import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "contact_info",
  title: "M7 Movelaria contact info",
  description: "Return M7 Movelaria's public contact information (phone, WhatsApp, hours).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      phone: "(41) 98711-6308",
      whatsapp: "https://wa.me/5541987116308",
      hours: "Segunda a sexta, 08h às 18h",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
