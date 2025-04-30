import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const NWS_API_BASE = 'https://www.thaqalayn-api.net/api/v2';
const USER_AGENT = 'weather-app/1.0';

// Create server instance
const server = new McpServer({
	name: 'thaqalayn-api',
	version: '1.0.0',
	capabilities: {
		resources: {},
		tools: {},
	},
});
