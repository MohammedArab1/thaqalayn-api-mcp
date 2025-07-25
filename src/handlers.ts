import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import HadithController from "./rest/controllers/hadithController.js";
import HadithService from "./rest/services/hadithService.js";

export const registerHandlers = (server: McpServer) => {
  const API_BASE = "https://www.thaqalayn-api.net/api/v2";

  const hadithService = new HadithService(API_BASE);
  const hadithController = new HadithController(hadithService);

  server.tool(
    "get-all-books",
    `Get all information about each book.
    Use this endpoint first to find book IDs if requesting an endpoint that requires a book id.`,
    async () => {
      const allBooks = await hadithController.allBooksHandler();
      if (!allBooks.data) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve book information",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: allBooks.data,
          },
        ],
      };
    },
  );

  server.tool("get-random-hadith", "Get a random hadith", async () => {
    const hadith = await hadithController.randomHadithHandler();
    if (!hadith.data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve hadith",
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: hadith.data,
        },
      ],
    };
  });

  server.tool(
    "search-all-books",
    "Search hadiths based on a query",
    {
      query: z.string().describe("search query"),
    },
    async ({ query }) => {
      const hadiths = await hadithController.hadithQueryHandler(query);
      if (!hadiths.data) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve hadiths",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: hadiths.data,
          },
        ],
      };
    },
  );

  server.tool(
    "fetch-ingredients",
    `
    Fetches all relevant ingredients with their haram / halal status and any extra information available.
    This is based on Sistani's rulings.
    `,

    async () => {
      const ingredients = await hadithController.ingredientsHandler();
      if (!ingredients.data) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve ingredients",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: ingredients.data,
          },
        ],
      };
    },
  );

  server.tool(
    "get-graphql-introspection",
    `
    Fetches the graphql introspection, used to know how to make requests to the graphql api
    to fetch only the necessary fields.
    `,
    async () => {
      const introspection = await hadithController.introspectionHandler();
      if (!introspection.data) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve introspection",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: introspection.data,
          },
        ],
      };
    },
  );

  server.tool(
    "make-gql-request",
    `
    Makes a GQL request. Information must first be fetched from the get-graphql-introspection tool
    `,
    {
      query: z.string().describe(`
        graphql query. Query must be json object with "query" field and the gql query as a string value
      `),
    },
    async ({ query }) => {
      const gql = await hadithController.gqlHandler(query);
      if (!gql.data) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve introspection",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: gql.data,
          },
        ],
      };
    },
  );
};
