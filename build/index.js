import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import HadithService from "./rest/services/hadithService.js";
import HadithController from "./rest/controllers/hadithController.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
const API_BASE = "https://www.thaqalayn-api.net/api/v2";
const USER_AGENT = "weather-app/1.0";
// Create server instance
const server = new McpServer({
    name: "thaqalayn-api",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
const returnContent = (type, text) => {
    return {
        content: [type, text],
    };
};
const hadithService = new HadithService(API_BASE);
const hadithController = new HadithController(hadithService);
server.tool("get-all-books", "Get all book information", async () => {
    const allBooks = await hadithController.allBooksHandler();
    if (!allBooks.data) {
        return returnContent("text", "Failed to retrieve book information");
    }
    return returnContent("text", allBooks.data);
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Thaqalayn API MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
