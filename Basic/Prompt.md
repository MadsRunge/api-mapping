I want you to map API calls of a site using the chrome dev tools mcp server.

It is this site: [WEBSITE-URL]

I want you to try and do it - I want a complete mapping of how to call their API - just as the site does.

Experiment with it and create a complete workbook for how to solve this task using the mcp server.

I want the output to be a clean OpenAPI standard documentation of the API. Store this in APIs/[SITE-NAME]/\*

Please follow this process:

1. INITIAL EXPLORATION (5-10 minutes)

   - Navigate to the website
   - Capture initial page load network traffic
   - Identify the API base URL
   - Find authentication method (API key, bearer token, etc.)
   - List all initial API endpoints called

2. INTERACTIVE DISCOVERY (10-15 minutes)

   - Take a snapshot of the page to identify interactive elements
   - Test search functionality (fill inputs and click search)
   - Navigate through different sections (listings, details, filters)
   - Click on items to see detail page API calls
   - Interact with forms, filters, and navigation
   - Capture all API calls triggered by each interaction

3. API ANALYSIS (5-10 minutes)

   - For each discovered endpoint, get full request details:
     - HTTP method
     - Full URL with parameters
     - Request headers (especially auth headers)
     - Request body (if POST/PUT)
     - Response structure
   - Group endpoints by functionality (search, details, stats, etc.)
   - Identify patterns in:
     - Parameter naming
     - Response formats
     - Authentication
     - Pagination
     - Error handling

4. DOCUMENTATION GENERATION (10-15 minutes)
   Create these files in APIs/[SITE-NAME]/:

   - openapi.yaml: Complete OpenAPI 3.0 specification with:

     - All endpoints
     - Request/response schemas
     - Authentication
     - Parameters and their types
     - Examples

   - README.md: User-friendly documentation with:

     - API overview
     - Authentication guide
     - Quick start examples
     - Endpoint summary table
     - Common use cases

   - workbook.md: Technical details with:

     - Discovery methodology
     - All captured requests/responses
     - Technical findings
     - Architecture insights

   - examples/ folder with:

     - Code examples for main endpoints
     - Multiple languages (bash, JavaScript, Python)
     - Real request/response samples

   - INDEX.md: Navigation guide for all documentation

IMPORTANT:

- Use the Chrome DevTools MCP tools for ALL interactions
- Capture network traffic after EVERY action
- Get detailed request info for EVERY endpoint found
- Document EVERYTHING you discover
- Create working code examples that users can copy-paste
- Make the documentation GitHub-ready

Start immediately and provide updates as you progress through each phase.
