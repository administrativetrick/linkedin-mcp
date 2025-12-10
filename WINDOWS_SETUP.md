# Windows Setup Guide - LinkedIn Jobs MCP Server

Quick guide for Windows users!

## ✅ Fixed: The Windows Issue

The original build script used Unix commands that don't work on Windows. This has been fixed!

## Quick Fix for Your Current Installation

If you're already in `D:\Claude\linkedin-mcp-server`, just update your `package.json`:

### Option 1: Download Fresh (Recommended)
Download the updated ZIP file and start fresh.

### Option 2: Manual Fix
1. Open `package.json` in your editor
2. Find the `"scripts"` section
3. Change this:
   ```json
   "build": "tsc && chmod 755 build/index.js",
   ```
   To this:
   ```json
   "build": "tsc",
   ```
4. Save the file

## Complete Windows Setup (5 minutes)

### Step 1: Install
```powershell
cd D:\Claude\linkedin-mcp-server
npm install
```

This should now work without the `chmod` error!

### Step 2: Build
```powershell
npm run build
```

You should see:
- No errors
- A new `build` folder created
- `build/index.js` file exists

### Step 3: Configure Claude Desktop

**Windows Config Location:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Quick way to open it:**
```powershell
notepad %APPDATA%\Claude\claude_desktop_config.json
```

**Add this configuration:**
```json
{
  "mcpServers": {
    "linkedin-jobs": {
      "command": "node",
      "args": [
        "D:\\Claude\\linkedin-mcp-server\\build\\index.js"
      ]
    }
  }
}
```

**Important:** Use double backslashes `\\` in the path!

### Step 4: Restart Claude Desktop

Completely close and reopen Claude Desktop.

### Step 5: Test It!

In Claude Desktop, ask:
```
"Search for software engineer jobs in San Francisco"
```

## Verify Everything Works

### Check the build folder exists:
```powershell
dir build
```

You should see `index.js`

### Check Node.js can run it:
```powershell
node build/index.js
```

It should wait for input (that's correct - press Ctrl+C to exit)

## Troubleshooting Windows Issues

### "Cannot find module" error

Make sure you ran `npm install` successfully first.

### "node is not recognized"

Install Node.js from https://nodejs.org/ (LTS version recommended)

### Claude Desktop can't find the server

1. **Check your path** - In the config, use the FULL path:
   ```powershell
   # Get the full path
   cd D:\Claude\linkedin-mcp-server
   pwd
   # Or in PowerShell:
   (Get-Location).Path
   ```

2. **Use double backslashes** in JSON:
   ```json
   "D:\\Claude\\linkedin-mcp-server\\build\\index.js"
   ```

3. **Restart Claude Desktop completely** - Close it from the system tray

### Build folder is empty

Try rebuilding:
```powershell
# Clean and rebuild
Remove-Item -Recurse -Force build
npm run build
```

## Windows-Specific Tips

### Using PowerShell (Recommended)

PowerShell is better than CMD for this. Open PowerShell:
1. Press `Win + X`
2. Select "Windows PowerShell" or "Terminal"

### Path Separators

Windows uses backslashes `\` in paths, but in JSON you must use:
- Double backslashes: `\\` or
- Forward slashes: `/` (also works!)

Example (both work):
```json
"D:\\Claude\\linkedin-mcp-server\\build\\index.js"
"D:/Claude/linkedin-mcp-server/build/index.js"
```

### Running npm scripts

In PowerShell, you might need to enable script execution:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Your Config Should Look Like This

Complete working example:

```json
{
  "mcpServers": {
    "linkedin-jobs": {
      "command": "node",
      "args": [
        "D:\\Claude\\linkedin-mcp-server\\build\\index.js"
      ]
    }
  }
}
```

Or with forward slashes:
```json
{
  "mcpServers": {
    "linkedin-jobs": {
      "command": "node",
      "args": [
        "D:/Claude/linkedin-mcp-server/build/index.js"
      ]
    }
  }
}
```

## Success Checklist

- ✅ `npm install` completes without errors
- ✅ `npm run build` completes without errors
- ✅ `build/index.js` file exists
- ✅ Config file has correct path with double backslashes
- ✅ Claude Desktop completely restarted
- ✅ Can ask Claude to search jobs

## Next Steps

Once it's working:
1. Try different job searches (see EXAMPLES.md)
2. Experiment with filters
3. Share your success!

## Need More Help?

- Check the main README.md
- See EXAMPLES.md for usage examples
- Review QUICKSTART.md for general setup

---

**Windows-specific fixes applied! ✅**

You should now be able to run `npm install` successfully!
