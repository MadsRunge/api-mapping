# Automated API Mapping Playbook

## What Is This?

A simple way to automatically discover and document any website's API by giving Claude Code a single prompt. The AI will:

- Navigate the website and capture all network traffic
- Analyze API endpoints, authentication, and parameters
- Generate complete OpenAPI 3.0 specifications
- Create code examples in multiple languages
- Produce comprehensive documentation

## Why Use This?

- ⚡ **Fast**: 10-30 minutes vs. days of manual work
- 📝 **Complete**: Captures all endpoints with request/response details
- 🎯 **Accurate**: Direct observation of real API calls
- 🔄 **Automated**: Just give the prompt and let AI do the work
- 📚 **Professional**: Generates OpenAPI specs and documentation

## Installation

Follow the installation instructions for your platform:

👉 **https://github.com/ChromeDevTools/chrome-devtools-mcp**

The repository covers installation for:

- Claude Desktop (macOS, Windows, Linux)
- VS Code with Claude Code
- Other MCP-compatible clients

After installation, restart your Claude Code client and verify by asking:

```
Do you have access to Chrome DevTools MCP tools?
```

## What to Expect

### Phase 1: Initial Exploration

Claude will:

- Navigate to the website
- Capture initial API calls
- Identify authentication
- Report base URL and initial findings

### Phase 2: Interactive Discovery

Claude will:

- Fill search forms and click buttons
- Navigate through pages
- Interact with filters and options
- Capture all triggered API calls

### Phase 3: API Analysis

Claude will:

- Analyze each endpoint in detail
- Extract parameters and schemas
- Identify patterns and conventions
- Group endpoints by category

### Phase 4: Documentation

Claude will create:

- `APIs/[site-name]/openapi.yaml` - Full OpenAPI spec
- `APIs/[site-name]/README.md` - Main documentation
- `APIs/[site-name]/workbook.md` - Technical details
- `APIs/[site-name]/examples/` - Code samples
- `APIs/[site-name]/INDEX.md` - Navigation guide

**Time**: 30 minutes
**Endpoints Found**: 14
**Documentation**: 100% complete with working examples

## Tips for Success

### Choose the Right Target

✅ **Good targets**:

- Public websites with clear functionality
- Sites with search, filters, and listings
- APIs used by the frontend

❌ **Avoid**:

- Sites requiring paid accounts
- Sites with heavy rate limiting
- Sites with anti-bot protection

### Getting Better Results

1. **Be Specific**: Give exact URLs and clear site names
2. **Check Progress**: Claude will report findings as it works
3. **Verify Output**: Test the generated examples
4. **Iterate**: If something is missed, ask Claude to explore that area

### Troubleshooting

**Issue**: "No MCP tools found"

- Solution: Verify MCP server is installed and Claude Code is restarted

**Issue**: "Page won't load"

- Solution: Check if the site is accessible and try a different URL

**Issue**: "Missing endpoints"

- Solution: Ask Claude to interact more with specific features

**Issue**: "Authentication not working"

- Solution: The captured API key may have expired - this is normal for session-based auth

## Advanced Usage

### Custom Instructions

Add these to the prompt for specific needs:

**For GraphQL APIs**:

```
Also check for GraphQL endpoints and document the schema
```

**For WebSocket APIs**:

```
Look for WebSocket connections and document real-time endpoints
```

**For Specific Features**:

```
Focus specifically on the [checkout/payment/user profile] functionality
```

**For Multiple Languages**:

```
Create code examples in [JavaScript, Python, Go, Ruby, PHP]
```

## Quick Start Checklist

- [ ] Install Chrome DevTools MCP server
- [ ] Start Claude Code
- [ ] Copy the prompt above
- [ ] Replace `[WEBSITE-URL]` with target site
- [ ] Replace `[SITE-NAME]` with a folder name
- [ ] Paste into Claude Code
- [ ] Wait for complete documentation

---

**Official MCP Server**: https://github.com/ChromeDevTools/chrome-devtools-mcp
**Model Context Protocol**: https://modelcontextprotocol.io/
**OpenAPI Specification**: https://swagger.io/specification/

**Last Updated**: October 5, 2025
