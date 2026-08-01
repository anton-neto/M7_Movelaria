import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "@/data/projects";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "List all M7 Movelaria showcase projects with client, architect, and ambient count.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = projects.map((p) => ({
      slug: p.slug,
      name: p.name,
      client: p.client,
      architect: p.architect,
      description: p.description,
      ambientes: p.ambientes.map((a) => a.name),
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { projects: items },
    };
  },
});
