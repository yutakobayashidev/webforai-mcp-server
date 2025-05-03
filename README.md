# WebforAI Text Extractor - MCP Server

A Cloudflare Workers-based Model Context Protocol (MCP) server that extracts plain text from web pages using [WebforAI](https://webforai.dev/).

## 🌟 What is WebforAI?

[WebforAI](https://webforai.dev/) is a powerful library designed to make web content accessible to AI models. It provides tools to:

- Convert HTML to clean, structured Markdown
- Extract meaningful content from web pages
- Process tables, links, and images intelligently
- Prepare web content for AI consumption

This MCP server leverages WebforAI's capabilities to extract plain text from any web page URL, making it easy to feed web content into AI models through the Model Context Protocol.

## 📋 Features

- **Simple API**: Extract text from any web page with a single API call
- **Clean Output**: Receive well-formatted Markdown text without HTML noise
- **Error Handling**: Robust error handling for failed requests
- **Cloudflare Workers**: Serverless deployment with global distribution
- **MCP Compatible**: Works with any MCP client like Claude Desktop or Cloudflare AI Playground

## 🚀 Getting Started

### Deploy to Cloudflare Workers

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/yutakobayashidev/webforai-mcp-server)

This will deploy your MCP server to a URL like: `webforai-mcp-server.<your-account>.workers.dev/sse`

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/yutakobayashidev/webforai-mcp-server.git
   cd webforai-mcp-server
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Your server will be available at `http://localhost:8787`

## 🔧 Using the Text Extraction Tool

The `extractWebPageText` tool accepts a URL to a web page and returns the extracted text content in markdown format:

```json
{
  "url": "https://example.com/page"
}
```

The response will contain the extracted text in Markdown format, with:
- Links converted to plain text
- Tables converted to plain text
- Images hidden

## 🔌 Connecting to MCP Clients

### Cloudflare AI Playground

1. Go to [Cloudflare AI Playground](https://playground.ai.cloudflare.com/)
2. Enter your deployed MCP server URL (`webforai-mcp-server.<your-account>.workers.dev/sse`)
3. You can now use your text extraction tool directly from the playground!

### Claude Desktop

To connect to your MCP server from Claude Desktop:

1. Follow [Anthropic's Quickstart](https://modelcontextprotocol.io/quickstart/user)
2. In Claude Desktop go to Settings > Developer > Edit Config
3. Update with this configuration:

```json
{
  "mcpServers": {
    "webforaiExtractor": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/sse"  // or webforai-mcp-server.your-account.workers.dev/sse
      ]
    }
  }
}
```

4. Restart Claude and you should see the text extraction tool become available

## 📚 Learn More

- [WebforAI Documentation](https://webforai.dev/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare AI](https://developers.cloudflare.com/ai/)

## 📄 License

MIT       
