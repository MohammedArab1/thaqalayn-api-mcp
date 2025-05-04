import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import HadithService from "./rest/services/hadithService.js";
import HadithController from "./rest/controllers/hadithController.js";
import { MCPReturn } from "./types/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { registerHandlers } from "./handlers.js";

// Create server instance
// const server = new McpServer({
//   name: "thaqalayn-api",
//   version: "1.0.0",
//   capabilities: {
//     resources: {},
//     tools: {},
//   },
// });

const returnContent = (
  type: "text" | "image" | "audio" | "resource",
  text: string,
) => {
  return {
    content: [{ type, text }],
  };
};

// const hadithService = new HadithService(API_BASE);
// const hadithController = new HadithController(hadithService);

// server.tool("get-all-books", "Get all book information", async () => {
//   const allBooks = await hadithController.allBooksHandler();
//   if (!allBooks.data) {
//     // return returnContent("text", "Failed to retrieve book information");
//     return {
//       content: [
//         {
//           type: "text",
//           text: "Failed to retrieve book information",
//         },
//       ],
//     };
//   }
//   // return returnContent("text", allBooks.data);
//   return {
//     content: [
//       {
//         type: "text",
//         text: allBooks.data,
//       },
//     ],
//   };
// });

// server.tool("get-random-hadith", "Get a random hadith", async () => {
//   const hadith = await hadithController.randomHadithHandler();
//   if (!hadith.data) {
//     // return returnContent("text", "Failed to retrieve book information");
//     return {
//       content: [
//         {
//           type: "text",
//           text: "Failed to retrieve hadith",
//         },
//       ],
//     };
//   }
//   // return returnContent("text", allBooks.data);
//   return {
//     content: [
//       {
//         type: "text",
//         text: hadith.data,
//       },
//     ],
//   };
// });

// server.tool(
//   "search-all-books",
//   "Search hadiths based on a query",
//   {
//     query: z.string().describe("search query"),
//   },
//   async ({ query }) => {
//     const hadiths = await hadithController.hadithQueryHandler(query);
//     if (!hadiths.data) {
//       return {
//         content: [
//           {
//             type: "text",
//             text: "Failed to retrieve hadiths",
//           },
//         ],
//       };
//     }
//     return {
//       content: [
//         {
//           type: "text",
//           text: hadiths.data,
//         },
//       ],
//     };
//   },
// );

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
