# Bygningsreglementet.dk API Documentation

## Overview

The Bygningsreglementet.dk API provides programmatic access to search Danish Building Regulations (BR18). This public API allows you to search across regulations, guidelines, appendices, and related documents.

**Base URL:** `https://www.bygningsreglementet.dk`

**Authentication:** None required (public API)

**Response Format:** JSON

**CDN:** Cloudflare (cached responses)

## Quick Start

### Simple Search

```bash
curl "https://www.bygningsreglementet.dk/api/search?term=brand&culture=da&pageNumber=1"
```

### Search with Category Filter

```bash
curl "https://www.bygningsreglementet.dk/api/search?term=energi&culture=da&category_c=kravbestemmelser&pageNumber=1"
```

### Paginated Search

```bash
curl "https://www.bygningsreglementet.dk/api/search?term=brand&culture=da&pageNumber=2&pageSize=20"
```

## API Endpoints

### Search Regulations

**Endpoint:** `GET /api/search`

Search across all building regulations content including requirements, guidelines, appendices, and documents.

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `term` | string | Yes | - | Search term to query |
| `culture` | string | No | `da` | Language code (`da` or `en`) |
| `pageNumber` | integer | No | `1` | Page number (1-indexed) |
| `pageSize` | integer | No | `10` | Results per page (1-100) |
| `category_c` | string | No | `""` | Category filter (see below) |

#### Category Filters

| Value | Description |
|-------|-------------|
| `""` (empty) | All results |
| `br18` | BR18 regulations |
| `kravbestemmelser` | Requirements |
| `bilag` | Appendices |
| `nationale-annekser` | National annexes |
| `vejledninger` | Guidelines |
| `vejledning` | Guidance |
| `dokumenter` | Documents |

#### Response Structure

```json
{
  "filters": [...],
  "statusCode": 200,
  "pagination": {
    "previousPageUrl": null,
    "currentPageUrl": "https://...",
    "nextPageUrl": "https://...",
    "pageNumber": 1,
    "pageSize": 10,
    "totalPages": 33,
    "totalResults": 321,
    "totalResultsMessage": "Din anmodning gav 321 resultater."
  },
  "data": [
    {
      "title": "Document title",
      "text": "Preview text...",
      "url": "https://www.bygningsreglementet.dk/media/...",
      "score": 0.022318333
    }
  ],
  "errorMessage": null,
  "errorId": null,
  "timestampUtc": "2025-11-12T12:22:10.2046785Z"
}
```

## Common Use Cases

### 1. Search for Fire Safety Regulations

```bash
curl "https://www.bygningsreglementet.dk/api/search?term=brand&culture=da&category_c=kravbestemmelser"
```

### 2. Search for Energy Requirements

```bash
curl "https://www.bygningsreglementet.dk/api/search?term=energi&culture=da&category_c=br18"
```

### 3. Find Specific Paragraph

```bash
curl "https://www.bygningsreglementet.dk/api/search?term=%C2%A7%20250&culture=da"
```

### 4. Browse All Guidelines

```bash
curl "https://www.bygningsreglementet.dk/api/search?term=&culture=da&category_c=vejledninger&pageSize=50"
```

### 5. Paginate Through Results

```bash
# First page
curl "https://www.bygningsreglementet.dk/api/search?term=konstruktion&pageNumber=1"

# Second page
curl "https://www.bygningsreglementet.dk/api/search?term=konstruktion&pageNumber=2"

# Use nextPageUrl from pagination response for convenience
```

## Response Fields

### Search Result Object

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Document or regulation title |
| `text` | string | Preview/excerpt from the document |
| `url` | string | Direct URL to the document (often PDF) |
| `score` | number | Relevance score (0-1, higher is more relevant) |

### Pagination Object

| Field | Type | Description |
|-------|------|-------------|
| `pageNumber` | integer | Current page number |
| `pageSize` | integer | Results per page |
| `totalPages` | integer | Total number of pages |
| `totalResults` | integer | Total number of results found |
| `previousPageUrl` | string/null | URL to previous page |
| `currentPageUrl` | string | URL of current page |
| `nextPageUrl` | string/null | URL to next page |
| `totalResultsMessage` | string | Human-readable results message |

### Filter Object

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name of the filter |
| `url` | string | URL to apply this filter |
| `isActive` | boolean | Whether filter is currently active |

## Error Handling

The API returns standard HTTP status codes:

- `200 OK` - Successful request
- `400 Bad Request` - Invalid parameters
- `500 Internal Server Error` - Server error

Error responses include:

```json
{
  "statusCode": 400,
  "errorMessage": "Error description",
  "errorId": "ERR-2025-001",
  "timestampUtc": "2025-11-12T12:22:10.2046785Z"
}
```

## Best Practices

1. **Use Appropriate Page Sizes**: Default is 10, maximum is 100
2. **Cache Responses**: Results are cached by Cloudflare
3. **Use Category Filters**: Narrow results for better performance
4. **Handle Pagination**: Use `nextPageUrl` from response for easier navigation
5. **URL Encode Parameters**: Especially search terms with special characters
6. **Respect Rate Limits**: No explicit limits, but be respectful

## Code Examples

See the [examples](./examples/) directory for complete code examples in:
- Bash/cURL
- JavaScript/Node.js
- Python

## Technical Details

- **Server**: ASP.NET hosted on Cloudflare
- **Cache**: Cloudflare CDN with dynamic caching
- **Response Time**: Typically 100-300ms (depending on cache hit)
- **Character Encoding**: UTF-8
- **CORS**: Not explicitly enabled

## Additional Resources

- [OpenAPI Specification](./openapi.yaml) - Complete API specification
- [Workbook](./workbook.md) - Technical discovery details
- [Official Website](https://www.bygningsreglementet.dk/)

## Support

For questions about the building regulations themselves:

- **Email**: byggeri@sbst.dk
- **Website**: https://www.bygningsreglementet.dk/
- **Organization**: Social- og Boligstyrelsen

**Note**: Response time for email inquiries can be up to 3 months.

## License

This API documentation is provided as-is for public use. The Danish Building Regulations are public domain.
