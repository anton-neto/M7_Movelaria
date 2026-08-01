import { defineMcp } from "@lovable.dev/mcp-js";
import listProjectsTool from "./tools/list-projects";
import getProjectTool from "./tools/get-project";
import listFerragensTool from "./tools/list-ferragens";
import contactInfoTool from "./tools/contact-info";

export default defineMcp({
  name: "m7-movelaria-mcp",
  title: "M7 Movelaria Showroom",
  version: "0.1.0",
  instructions:
    "Public MCP server for the M7 Movelaria digital showroom. Use `list_projects` to browse projects, `get_project` for full ambient/hotspot details, `list_ferragens` for the standard hardware catalog, and `contact_info` for phone and WhatsApp.",
  tools: [listProjectsTool, getProjectTool, listFerragensTool, contactInfoTool],
});
