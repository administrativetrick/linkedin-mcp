#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Import LinkedIn jobs API
// @ts-ignore - Package doesn't have TypeScript definitions
import linkedIn from "linkedin-jobs-api";

// Define the query options schema using Zod
const LinkedInJobSearchSchema = z.object({
  keyword: z.string().describe("Job title or keywords to search for (e.g., 'software engineer', 'product manager')"),
  location: z.string().describe("Location to search in (e.g., 'San Francisco', 'New York', 'remote')"),
  dateSincePosted: z.enum(["past month", "past week", "24hr", ""]).default("").describe("Filter by posting date"),
  jobType: z.enum(["full time", "part time", "contract", "temporary", "volunteer", "internship", ""]).default("").describe("Type of employment"),
  remoteFilter: z.enum(["on site", "remote", "hybrid", ""]).default("").describe("Work location type"),
  salary: z.enum(["40000", "60000", "80000", "100000", "120000", ""]).default("").describe("Minimum salary filter"),
  experienceLevel: z.enum(["internship", "entry level", "associate", "senior", "director", "executive", ""]).default("").describe("Required experience level"),
  limit: z.string().default("10").describe("Number of jobs to return (1-100)"),
  sortBy: z.enum(["recent", "relevant", ""]).default("recent").describe("Sort results by recency or relevance"),
  page: z.string().default("0").describe("Page number for pagination"),
});

// Create the MCP server
const server = new Server(
  {
    name: "linkedin-jobs-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register the tools list handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  const tools: Tool[] = [
    {
      name: "search_linkedin_jobs",
      description: "Search for jobs on LinkedIn with advanced filtering options. Returns job listings with position titles, company names, locations, salary information, and application links.",
      inputSchema: {
        type: "object",
        properties: {
          keyword: {
            type: "string",
            description: "Job title or keywords to search for (e.g., 'software engineer', 'product manager')",
          },
          location: {
            type: "string",
            description: "Location to search in (e.g., 'San Francisco', 'New York', 'remote')",
          },
          dateSincePosted: {
            type: "string",
            enum: ["past month", "past week", "24hr", ""],
            description: "Filter by posting date",
          },
          jobType: {
            type: "string",
            enum: ["full time", "part time", "contract", "temporary", "volunteer", "internship", ""],
            description: "Type of employment",
          },
          remoteFilter: {
            type: "string",
            enum: ["on site", "remote", "hybrid", ""],
            description: "Work location type",
          },
          salary: {
            type: "string",
            enum: ["40000", "60000", "80000", "100000", "120000", ""],
            description: "Minimum salary filter",
          },
          experienceLevel: {
            type: "string",
            enum: ["internship", "entry level", "associate", "senior", "director", "executive", ""],
            description: "Required experience level",
          },
          limit: {
            type: "string",
            description: "Number of jobs to return (1-100, default: 10)",
          },
          sortBy: {
            type: "string",
            enum: ["recent", "relevant", ""],
            description: "Sort results by recency or relevance",
          },
          page: {
            type: "string",
            description: "Page number for pagination (default: 0)",
          },
        },
        required: ["keyword", "location"],
      },
    },
  ];

  return { tools };
});

// Register the tool call handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "search_linkedin_jobs") {
    try {
      // Validate the arguments
      const queryOptions = LinkedInJobSearchSchema.parse(args);

      // Convert to the format expected by linkedin-jobs-api
      const linkedInQuery: any = {
        keyword: queryOptions.keyword,
        location: queryOptions.location,
        dateSincePosted: queryOptions.dateSincePosted || undefined,
        jobType: queryOptions.jobType || undefined,
        remoteFilter: queryOptions.remoteFilter || undefined,
        salary: queryOptions.salary || undefined,
        experienceLevel: queryOptions.experienceLevel || undefined,
        limit: queryOptions.limit,
        sortBy: queryOptions.sortBy || undefined,
        page: queryOptions.page,
      };

      // Remove undefined values
      Object.keys(linkedInQuery).forEach(
        key => linkedInQuery[key] === undefined && delete linkedInQuery[key]
      );

      // Log the query for debugging
      console.error("LinkedIn Query:", JSON.stringify(linkedInQuery, null, 2));

      // Call LinkedIn jobs API
      let jobs;
      try {
        jobs = await linkedIn.query(linkedInQuery);
        console.error("LinkedIn API returned:", typeof jobs, Array.isArray(jobs) ? `Array[${jobs.length}]` : "Not an array");
      } catch (apiError) {
        console.error("LinkedIn API Error:", apiError);
        return {
          content: [
            {
              type: "text",
              text: `Error calling LinkedIn API: ${apiError instanceof Error ? apiError.message : String(apiError)}\n\nThis might be due to:\n- LinkedIn rate limiting\n- Network issues\n- Changes to LinkedIn's website structure\n\nTry again in a few moments.`,
            },
          ],
          isError: true,
        };
      }

      // Validate the response
      if (!jobs || !Array.isArray(jobs)) {
        console.error("Invalid response from LinkedIn API:", jobs);
        return {
          content: [
            {
              type: "text",
              text: `Received invalid response from LinkedIn API. The API may be experiencing issues or have changed its format.`,
            },
          ],
          isError: true,
        };
      }

      // Format the response
      if (jobs.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No jobs found for "${queryOptions.keyword}" in "${queryOptions.location}". Try adjusting your search criteria.`,
            },
          ],
        };
      }

      // Create a formatted response with error handling for each job
      let responseText = `Found ${jobs.length} job(s) for "${queryOptions.keyword}" in "${queryOptions.location}":\n\n`;

      jobs.forEach((job: any, index: number) => {
        try {
          // Safely access properties with defaults
          const position = job.position || "Unknown Position";
          const company = job.company || "Unknown Company";
          const location = job.location || "Unknown Location";
          const posted = job.agoTime || job.date || "Recently";
          const salary = job.salary || "";
          const jobUrl = job.jobUrl || "";

          responseText += `${index + 1}. ${position}\n`;
          responseText += `   Company: ${company}\n`;
          responseText += `   Location: ${location}\n`;
          responseText += `   Posted: ${posted}\n`;
          if (salary) {
            responseText += `   Salary: ${salary}\n`;
          }
          if (jobUrl) {
            responseText += `   Apply: ${jobUrl}\n`;
          }
          responseText += `\n`;
        } catch (jobError) {
          console.error(`Error processing job ${index}:`, jobError, job);
          responseText += `${index + 1}. [Error processing this job listing]\n\n`;
        }
      });

      return {
        content: [
          {
            type: "text",
            text: responseText,
          },
        ],
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          content: [
            {
              type: "text",
              text: `Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Error searching LinkedIn jobs: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }

  return {
    content: [
      {
        type: "text",
        text: `Unknown tool: ${name}`,
      },
    ],
    isError: true,
  };
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  // Log to stderr since stdout is used for MCP communication
  console.error("LinkedIn Jobs MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
