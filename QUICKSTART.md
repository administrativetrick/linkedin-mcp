# LinkedIn Jobs MCP Server - Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Install Dependencies (2 minutes)

```bash
cd linkedin-mcp-server
npm install
```

This installs:
- MCP SDK
- LinkedIn Jobs API
- TypeScript and other dependencies

## Step 2: Build the Server (30 seconds)

```bash
npm run build
```

This compiles the TypeScript code into JavaScript in the `build/` directory.

## Step 3: Configure Claude Desktop (2 minutes)

### Find Your Config File

**macOS:**
```bash
open ~/Library/Application\ Support/Claude/
```
Then open `claude_desktop_config.json`

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

### Add This Configuration

Get the **absolute path** to your project:
```bash
pwd
```

Then add this to your config file:

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

**Replace `/ABSOLUTE/PATH/TO/` with your actual path!**

Example (macOS):
```json
{
  "mcpServers": {
    "linkedin-jobs": {
      "command": "node",
      "args": [
        "/Users/yourname/projects/linkedin-mcp-server/build/index.js"
      ]
    }
  }
}
```

Example (Windows):
```json
{
  "mcpServers": {
    "linkedin-jobs": {
      "command": "node",
      "args": [
        "C:\\Users\\yourname\\projects\\linkedin-mcp-server\\build\\index.js"
      ]
    }
  }
}
```

## Step 4: Restart Claude Desktop (30 seconds)

**Important:** Completely quit and restart Claude Desktop for changes to take effect.

- **macOS**: Cmd + Q, then reopen
- **Windows**: Close the app completely, then reopen

## Step 5: Test It! (30 seconds)

Open Claude Desktop and try:

```
"Search for software engineer jobs in San Francisco"
```

You should see Claude use the `search_linkedin_jobs` tool and return results!

## Verification

### Check if the server is loaded:

In Claude, you can ask:
```
"What MCP servers are available?"
```

You should see `linkedin-jobs` in the list.

### Try different searches:

```
"Find remote data scientist positions posted in the past week"

"Search for entry-level marketing jobs in New York"

"Show me senior product manager roles in Seattle with minimum salary of $120,000"
```

## Troubleshooting

### "Server not found" or no tools available

1. **Check the path** - It must be absolute, not relative
   ```bash
   # In the project directory, run:
   pwd
   # Use this full path in your config
   ```

2. **Check the build exists**
   ```bash
   ls build/index.js
   # Should show the file
   ```

3. **Restart Claude Desktop** - Must do a complete restart

### "Build failed"

```bash
# Delete and reinstall
rm -rf node_modules build
npm install
npm run build
```

### No results from searches

- Try broader keywords
- Use different locations
- Remove filters to see if you get any results
- Try "remote" as the location

## Next Steps

Now that it's working:

1. **Read [EXAMPLES.md](EXAMPLES.md)** for advanced search techniques
2. **Read [README.md](README.md)** for full documentation
3. **Customize**: Modify `src/index.ts` to add your own features

## Common Use Cases

### Job Search
```
"Find [job title] jobs in [location]"
"Search for remote [job title] positions"
"Show me [experience level] [job title] roles"
```

### With Filters
```
"Find [job title] jobs in [location], posted in the past week"
"Search for [job type] [job title] positions with minimum salary of $X"
"Show me [work type] jobs for [job title] in [location]"
```

### Analysis
```
"Compare job opportunities for [role] in [city1] vs [city2]"
"What are common requirements for [role]?"
"Analyze the job market for [role] in [location]"
```

## Development Mode

Want to modify the server? Use watch mode:

```bash
npm run watch
```

This automatically rebuilds when you change files. Remember to restart Claude Desktop to load changes.

## Need Help?

- **Check [README.md](README.md)** for detailed documentation
- **See [EXAMPLES.md](EXAMPLES.md)** for usage examples
- **Check MCP docs**: https://modelcontextprotocol.io
- **LinkedIn Jobs API**: https://github.com/VishwaGauravIn/linkedin-jobs-api

## Success! 🎉

You now have a working LinkedIn Jobs MCP server! Claude can now:
- Search LinkedIn jobs directly
- Filter by experience, salary, job type, and more
- Help you with job search and career planning

Happy job hunting! 🚀
