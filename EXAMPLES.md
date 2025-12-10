# LinkedIn Jobs MCP Server - Usage Examples

## Basic Examples

### 1. Simple Job Search

**Query to Claude:**
```
"Search for software engineer jobs in San Francisco"
```

**What happens:**
- Tool: `search_linkedin_jobs`
- Parameters:
  - keyword: "software engineer"
  - location: "San Francisco"
  - All other parameters use defaults

### 2. Remote Job Search

**Query to Claude:**
```
"Find remote data scientist positions"
```

**What happens:**
- Tool: `search_linkedin_jobs`
- Parameters:
  - keyword: "data scientist"
  - location: "remote"
  - remoteFilter: "remote"

### 3. Entry-Level Jobs

**Query to Claude:**
```
"Show me entry-level marketing jobs in New York"
```

**What happens:**
- Tool: `search_linkedin_jobs`
- Parameters:
  - keyword: "marketing"
  - location: "New York"
  - experienceLevel: "entry level"

## Advanced Examples

### 4. Filtered by Salary and Experience

**Query to Claude:**
```
"Find senior software engineer positions in Seattle with minimum salary of $120,000"
```

**What happens:**
- Tool: `search_linkedin_jobs`
- Parameters:
  - keyword: "software engineer"
  - location: "Seattle"
  - experienceLevel: "senior"
  - salary: "120000"

### 5. Recent Postings Only

**Query to Claude:**
```
"Search for product manager jobs posted in the past week in Austin"
```

**What happens:**
- Tool: `search_linkedin_jobs`
- Parameters:
  - keyword: "product manager"
  - location: "Austin"
  - dateSincePosted: "past week"

### 6. Contract Work

**Query to Claude:**
```
"Find contract UX designer positions in Los Angeles"
```

**What happens:**
- Tool: `search_linkedin_jobs`
- Parameters:
  - keyword: "UX designer"
  - location: "Los Angeles"
  - jobType: "contract"

### 7. Hybrid Work

**Query to Claude:**
```
"Show me hybrid full-time jobs for business analysts in Chicago"
```

**What happens:**
- Tool: `search_linkedin_jobs`
- Parameters:
  - keyword: "business analyst"
  - location: "Chicago"
  - jobType: "full time"
  - remoteFilter: "hybrid"

## Complex Multi-Filter Examples

### 8. Highly Specific Search

**Query to Claude:**
```
"Find senior full-time machine learning engineer positions in San Francisco, 
posted in the last 24 hours, with minimum salary of $100,000, show me 20 results"
```

**What happens:**
- Tool: `search_linkedin_jobs`
- Parameters:
  - keyword: "machine learning engineer"
  - location: "San Francisco"
  - experienceLevel: "senior"
  - jobType: "full time"
  - dateSincePosted: "24hr"
  - salary: "100000"
  - limit: "20"

### 9. Executive Search

**Query to Claude:**
```
"Search for executive level positions in finance in Boston, sorted by most recent"
```

**What happens:**
- Tool: `search_linkedin_jobs`
- Parameters:
  - keyword: "finance"
  - location: "Boston"
  - experienceLevel: "executive"
  - sortBy: "recent"

## Pagination Examples

### 10. Getting More Results

**First Query:**
```
"Find software engineer jobs in Silicon Valley"
```

**Follow-up Query:**
```
"Show me the next page of results"
```

**What happens in follow-up:**
- Tool: `search_linkedin_jobs`
- Parameters: (same as before, but...)
  - page: "1" (next page)

## Comparative Search Examples

### 11. Multi-Location Comparison

**Query to Claude:**
```
"Compare software engineer salaries and opportunities in San Francisco vs New York. 
Search both locations."
```

**What happens:**
Claude will make two separate tool calls:
1. First call for San Francisco
2. Second call for New York
Then Claude will analyze and compare the results.

### 12. Market Research

**Query to Claude:**
```
"What are the most common requirements for senior product managers? 
Search for these positions across multiple cities."
```

**What happens:**
Claude will:
1. Search for senior product manager roles
2. Analyze job descriptions
3. Identify common patterns in requirements

## Integration Examples

### 13. With Resume Analysis

**Query to Claude:**
```
"Based on my resume (which I'll share), find relevant job openings in my area"
```

**Process:**
1. User shares resume
2. Claude analyzes skills, experience, location
3. Claude searches LinkedIn with appropriate filters
4. Claude highlights matching positions

### 14. Career Progression Planning

**Query to Claude:**
```
"I'm currently a mid-level data analyst. Show me senior data analyst positions 
and data scientist positions that could be my next career step."
```

**What happens:**
Claude will:
1. Search for senior data analyst positions
2. Search for entry/associate level data scientist positions
3. Compare requirements and provide career advice

## Troubleshooting Examples

### 15. Broad Search When No Results

**Initial Query:**
```
"Find blockchain developer jobs in a small town"
```

**If no results, Claude might suggest:**
```
"Let me broaden the search to include remote positions"
```

Then searches with `remoteFilter: "remote"`

### 16. Refining Search

**Initial Query:**
```
"Find jobs in tech"
```

**Claude's response might be:**
```
"That's quite broad. Let me search for 'software engineer' positions. 
Would you like to specify a location?"
```

## Best Practices

### Good Queries:
✅ "Find software engineer jobs in San Francisco"
✅ "Search for remote product manager positions"
✅ "Show entry-level marketing roles in New York"

### Less Effective Queries:
❌ "Find me a job" (too vague)
❌ "Jobs" (needs keyword and location)
❌ "What jobs are there?" (needs specifics)

### Tips for Best Results:
1. **Always specify a role** (keyword)
2. **Include a location** (or specify "remote")
3. **Use filters** to narrow results (experience level, salary, job type)
4. **Ask Claude to compare** multiple searches for better insights
5. **Request pagination** if you need more than the default 10 results

## Expected Response Format

All searches will return results in this format:

```
Found X job(s) for "[keyword]" in "[location]":

1. [Job Title]
   Company: [Company Name]
   Location: [Location]
   Posted: [Time]
   Salary: [Salary Range] (if available)
   Apply: [LinkedIn URL]

2. [Job Title]
   ...
```

## Error Handling

If something goes wrong, you'll see helpful error messages:

- **No results**: "No jobs found for [keyword] in [location]. Try adjusting your search criteria."
- **Invalid filter**: "Validation error: [specific field] must be one of [valid options]"
- **API error**: "Error searching LinkedIn jobs: [error details]"
