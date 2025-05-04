import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerHandlers } from "./handlers.js";
async function main() {
    const server = new McpServer({
        name: "thaqalayn-api",
        version: "1.0.0",
        capabilities: {
            resources: {},
            tools: {},
        },
    });
    registerHandlers(server);
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Thaqalayn API MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
