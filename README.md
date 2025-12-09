# LinkedIn Jobs MCP Server

A Model Context Protocol (MCP) server that enables Claude and other MCP clients to search LinkedIn jobs directly. Built with TypeScript and the official MCP SDK.

## Features

- 🔍 **Advanced Job Search**: Search LinkedIn jobs with multiple filters
- 🎯 **Smart Filtering**: Filter by location, job type, experience level, salary, and more
- ⚡ **Fast & Reliable**: Uses the proven `linkedin-jobs-api` package
- 🔧 **Easy Integration**: Works with Claude Desktop, Claude Code, and any MCP-compatible client

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup

1. **Clone or download this repository**

```bash
cd linkedin-mcp-server
```

2. **Install dependencies**

```bash
npm install
```

3. **Build the server**

```bash
npm run build
```

## Usage with Claude Desktop

### Configure Claude Desktop

1. Open your Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the server configuration:

```json
{
  "mcpServers": {
    "linkedin-jobs": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/linkedin-mcp-server/build/index.js"
      ]
    }
  }
}
```

**Important**: Replace `/ABSOLUTE/PATH/TO/` with the actual path to your project directory.

3. **Restart Claude Desktop** to load the new server

### Using npx (Alternative)

You can also run the server using npx after publishing to npm:

```json
{
  "mcpServers": {
    "linkedin-jobs": {
      "command": "npx",
      "args": [
        "-y",
        "linkedin-jobs-mcp-server"
      ]
    }
  }
}
```

## Available Tools

### `search_linkedin_jobs`

Search for jobs on LinkedIn with advanced filtering options.

**Required Parameters:**
- `keyword` (string): Job title or keywords to search for
- `location` (string): Location to search in (city, state, or "remote")

**Optional Parameters:**
- `dateSincePosted` (enum): "past month", "past week", "24hr"
- `jobType` (enum): "full time", "part time", "contract", "temporary", "volunteer", "internship"
- `remoteFilter` (enum): "on site", "remote", "hybrid"
- `salary` (enum): "40000", "60000", "80000", "100000", "120000" (minimum salary)
- `experienceLevel` (enum): "internship", "entry level", "associate", "senior", "director", "executive"
- `limit` (string): Number of results (1-100, default: "10")
- `sortBy` (enum): "recent", "relevant"
- `page` (string): Page number for pagination (default: "0")

## Example Queries

Once configured, you can ask Claude things like:

```
"Search for software engineer jobs in San Francisco"

"Find remote product manager positions posted in the past week"

"Look for entry-level data analyst jobs in New York with a minimum salary of $80,000"

"Show me senior full-time positions for machine learning engineers in Seattle"
```

## Example Response

```
Found 10 job(s) for "software engineer" in "San Francisco":

1. Senior Software Engineer
   Company: Tech Corp
   Location: San Francisco, CA
   Posted: 2 days ago
   Salary: $150,000 - $200,000
   Apply: https://linkedin.com/jobs/view/...

2. Full Stack Software Engineer
   Company: Startup Inc
   Location: San Francisco, CA (Hybrid)
   Posted: 1 week ago
   Apply: https://linkedin.com/jobs/view/...

...
```

## Development

### Build

```bash
npm run build
```

### Watch mode (for development)

```bash
npm run watch
```

### Test with MCP Inspector

The MCP Inspector is a useful tool for testing your server:

```bash
npm run inspector
```

This will open a web interface where you can test the server's tools interactively.

## How It Works

This MCP server:

1. **Receives requests** from Claude (or any MCP client) via the stdio transport
2. **Validates parameters** using Zod schemas
3. **Calls the LinkedIn Jobs API** (via `linkedin-jobs-api` package)
4. **Formats results** into readable text responses
5. **Returns data** back to the client

The server uses web scraping through the `linkedin-jobs-api` package, which accesses LinkedIn's public job listings. No authentication or API keys are required.

## Architecture

```
Claude Desktop (MCP Client)
        ↓
    stdio transport
        ↓
LinkedIn MCP Server (This project)
        ↓
linkedin-jobs-api package
        ↓
LinkedIn public job listings
```

## Troubleshooting

### Server not appearing in Claude Desktop

1. Check that the path in your config is absolute (not relative)
2. Ensure the build directory exists (`npm run build`)
3. Restart Claude Desktop completely
4. Check Claude Desktop logs for errors

### No results returned

1. Try broader search terms
2. Remove filters to see if you get results
3. Check if LinkedIn has jobs for your search criteria
4. Try different locations

### Build errors

1. Ensure you have Node.js 18+ installed
2. Delete `node_modules` and `build` directories
3. Run `npm install` again
4. Run `npm run build`

## Technical Details

- **MCP SDK Version**: 1.0.4
- **Transport**: stdio (standard input/output)
- **Language**: TypeScript
- **Runtime**: Node.js 18+
- **Data Source**: LinkedIn public job listings (via linkedin-jobs-api)

## Limitations

- **Rate limiting**: The underlying API may have rate limits
- **Public data only**: Only accesses publicly available job listings
- **No authentication**: Does not require or support LinkedIn authentication
- **Scraping-based**: Uses web scraping, which means it could break if LinkedIn changes their HTML structure

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this in your own projects!

## Related Projects

- [Model Context Protocol](https://github.com/modelcontextprotocol) - Official MCP specification and SDKs
- [linkedin-jobs-api](https://github.com/VishwaGauravIn/linkedin-jobs-api) - The LinkedIn jobs scraping package used by this server
- [MCP Servers](https://github.com/modelcontextprotocol/servers) - Official collection of MCP servers

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the MCP documentation at https://modelcontextprotocol.io
3. Open an issue on GitHub with details about your problem

## Acknowledgments

- Built with the [Model Context Protocol](https://modelcontextprotocol.io) by Anthropic
- Uses the excellent [linkedin-jobs-api](https://www.npmjs.com/package/linkedin-jobs-api) package
- Inspired by the growing MCP ecosystem
