import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { htmlToMarkdown } from "webforai";

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "WebforAI Text Extractor",
		version: "1.0.0",
	});

	async init() {
		this.server.tool(
			"extractWebPageText",
			{
				url: z.string().url(),
			},
			async ({ url }) => {
				try {
					const response = await fetch(url);
					if (!response.ok) {
						throw new Error(
							`Failed to fetch URL: ${response.status} ${response.statusText}`,
						);
					}

					const contentType = response.headers.get("content-type") || "";
					if (!contentType.includes("text/html")) {
						throw new Error(
							`URL does not return HTML content. Content-Type: ${contentType}`,
						);
					}

					const html = await response.text();

					const markdown = htmlToMarkdown(html, {
						baseUrl: url,
						linkAsText: true, // Convert links to plain text
						tableAsText: true, // Convert tables to plain text
						hideImage: true, // Hide images
					});

					return {
						content: [
							{
								type: "text",
								text: markdown,
							},
						],
					};
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					return {
						content: [
							{
								type: "text",
								text: `Error extracting text from ${url}: ${errorMessage}`,
							},
						],
					};
				}
			},
		);
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			// @ts-ignore
			return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
		}

		if (url.pathname === "/mcp") {
			// @ts-ignore
			return MyMCP.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};
