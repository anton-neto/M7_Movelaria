import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "@/data/projects";

export default defineTool({
  name: "get_project",
  title: "Get project details",
  description:
    "Return full details for a single M7 Movelaria project by slug, including every ambient, hotspot, materials, ferragens, iluminação, and diferenciais.",
  inputSchema: {
    slug: z.string().min(1).describe("Project slug, e.g. 'residencia-aurora'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const project = projects.find((p) => p.slug === slug);
    if (!project) {
      return {
        content: [{ type: "text", text: `No project found with slug '${slug}'.` }],
        isError: true,
      };
    }
    const { cover: _cover, ...rest } = project;
    const clean = {
      ...rest,
      ambientes: project.ambientes.map(({ image: _i, ...a }) => a),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(clean, null, 2) }],
      structuredContent: { project: clean },
    };
  },
});
