# Debugging the "https://www..." JSON Error

## What's Happening

The error `unexpected token 'h', https://www"...is not valid JSON` happens when:
1. The LinkedIn API returns unexpected data
2. A job URL contains special characters that aren't handled properly
3. The linkedin-jobs-api package encounters an error

## Quick Fix Steps

### Step 1: Test the LinkedIn API Directly

First, let's see if the LinkedIn API is working at all:

```powershell
cd D:\Claude\linkedin-mcp-server
node test-linkedin-api.js
```

**What to look for:**
- ✅ If it shows jobs → The API works, issue is in the MCP server
- ❌ If it shows an error → The LinkedIn API itself has issues

---

### Step 2: Rebuild with Better Error Handling

I've added much better error handling. Rebuild the server:

```powershell
cd D:\Claude\linkedin-mcp-server
npm run build
```

**Restart Claude Desktop completely** (important!)

---

### Step 3: Try a Simple Search

Try a very simple search to test:

```
"Search for teacher jobs in Boston"
```

This uses common words that are less likely to have special characters.

---

### Step 4: Check the Logs

The improved server now logs to stderr. To see the logs:

**Windows PowerShell:**
```powershell
# Run the server manually to see logs
node D:\Claude\linkedin-mcp-server\build\index.js
```

Then in Claude Desktop, try a search. You'll see debug output in the PowerShell window.

Press Ctrl+C when done.

---

## Common Issues & Solutions

### Issue 1: LinkedIn Rate Limiting

**Symptom:** Works sometimes, fails other times

**Solution:** 
- Wait a few minutes between searches
- Use more specific search terms
- The linkedin-jobs-api scrapes LinkedIn's public site, so too many requests may get rate limited

---

### Issue 2: Invalid Job Data

**Symptom:** Error mentions `https://` or URLs

**Solution:** The improved error handling now:
- ✅ Validates each job before processing
- ✅ Skips jobs with bad data
- ✅ Shows which job failed

---

### Issue 3: API Changes

**Symptom:** Worked before, stopped working

**Solution:** LinkedIn may have changed their HTML structure
1. Check for package updates:
   ```powershell
   npm update linkedin-jobs-api
   npm run build
   ```

2. Check the package issues: https://github.com/VishwaGauravIn/linkedin-jobs-api/issues

---

## Debug Mode: See What's Happening

### Option 1: Manual Server Run

Run the server manually to see all debug output:

```powershell
# Terminal 1: Run the MCP server manually
cd D:\Claude\linkedin-mcp-server
node build\index.js
```

Keep this window open. Now use Claude Desktop to search for jobs. You'll see debug logs like:

```
LinkedIn Query: {
  "keyword": "software engineer",
  "location": "San Francisco",
  ...
}
LinkedIn API returned: Array[10]
```

This helps identify where the error occurs.

---

### Option 2: Test API Output

```powershell
node test-linkedin-api.js
```

This shows you exactly what the LinkedIn API is returning.

**Example Good Output:**
```
Success! Received response:
Type: object
Is Array: true
Length: 3

First Job Details:
Position: Software Engineer
Company: Tech Corp
Location: San Francisco
Job URL: https://linkedin.com/jobs/view/...
```

**Example Bad Output (means API issue):**
```
Error calling LinkedIn API:
Error Type: TypeError
Error Message: Cannot read property 'query' of undefined
```

---

## Workarounds

If the LinkedIn API is unreliable, you can:

### 1. Try Different Search Terms

Some searches work better than others:
- ✅ "software engineer" + "San Francisco"
- ✅ "teacher" + "Boston"
- ❌ Very long job titles with special characters
- ❌ Non-English locations with accents

### 2. Use Fewer Filters

Start with just keyword and location:
```
"Search for software engineer jobs in San Francisco"
```

Then add filters one at a time:
```
"Search for remote software engineer jobs in San Francisco"
```

### 3. Limit Results

Ask for fewer results (less data to process):
```
"Search for software engineer jobs in San Francisco, show me 5 results"
```

---

## Getting More Help

### Share Debug Output

If it's still not working:

1. **Run the test script:**
   ```powershell
   node test-linkedin-api.js > debug-output.txt 2>&1
   ```

2. **Share the output** - paste the contents of `debug-output.txt`

3. **Include:**
   - What search query you tried
   - The exact error message from Claude
   - Any console output

### Check Package Status

```powershell
# See what version you have
npm list linkedin-jobs-api

# Check for updates
npm outdated
```

---

## Alternative: Different LinkedIn Package

If linkedin-jobs-api is unreliable, we could switch to a different package. Let me know if you want to try:
- `@atharvh01/linkedin-jobs-api`
- Or build a custom scraper

---

## Expected Behavior After Fix

After rebuilding with better error handling, you should see:

**If LinkedIn API fails:**
```
Error calling LinkedIn API: [specific error message]

This might be due to:
- LinkedIn rate limiting
- Network issues
- Changes to LinkedIn's website structure

Try again in a few moments.
```

**If specific jobs fail:**
```
Found 10 job(s) for "software engineer" in "San Francisco":

1. Senior Software Engineer
   Company: Tech Corp
   ...
   
2. [Error processing this job listing]

3. Full Stack Engineer
   ...
```

The server now handles errors gracefully instead of crashing!

---

## Next Steps

1. **Rebuild** with `npm run build`
2. **Run test script** with `node test-linkedin-api.js`
3. **Restart Claude Desktop completely**
4. **Try a simple search**
5. **Share any error messages** you still see

The improved error handling will give us much better information about what's failing!
