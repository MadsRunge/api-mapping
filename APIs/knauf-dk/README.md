# Knauf Denmark Download Center API

Complete API documentation for accessing Knauf Denmark's technical documentation download center.

## Overview

The Knauf Denmark Download Center provides access to thousands of technical documents including product datasheets, manuals, certificates, environmental declarations, and installation guides for Knauf products in Denmark.

**Base URL**: `https://s8qhlx2fwa-dsn.algolia.net/1` (Search API)
**Download URL**: `https://knauf.com/api/download-center/v1` (Document Downloads)

## Quick Start

### Authentication

The API uses Algolia authentication headers:

```bash
x-algolia-api-key: b3a868e70bb30b11a4b7e385c765ba91
x-algolia-application-id: S8QHLX2FWA
```

### Simple Search Example

```bash
curl -X POST 'https://s8qhlx2fwa-dsn.algolia.net/1/indexes/*/queries' \
  -H 'x-algolia-api-key: b3a868e70bb30b11a4b7e385c765ba91' \
  -H 'x-algolia-application-id: S8QHLX2FWA' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d '{
    "requests": [{
      "indexName": "prod_download_center_dk",
      "params": "query=Ultra Board&page=0"
    }]
  }'
```

### Download a Document

```bash
curl 'https://knauf.com/api/download-center/v1/assets/abfa9e74-58c7-4257-b592-895b15155394?download=true&country=dk&locale=da-DK' \
  -o document.pdf
```

## Features

- **Full-Text Search**: Search across document names, keywords, and product names
- **Faceted Filtering**: Filter by document type, language, product category, application area, and division
- **Multi-Language Support**: Danish (da), English (en), German (de), Swedish (sv)
- **Pagination**: Navigate through large result sets
- **Document Downloads**: Individual file downloads or bulk archive creation
- **Rich Metadata**: Comprehensive information about each document including file size, page count, and update date

## API Endpoints

### 1. Search Documents

**POST** `/indexes/*/queries`

Search and filter documents in the download center.

**Request Parameters:**
- `indexName`: `prod_download_center_dk` (required)
- `params`: URL-encoded search parameters (required)

**Common Search Parameters:**
- `query`: Search query string
- `page`: Page number (0-indexed, default: 0)
- `hitsPerPage`: Results per page (default: 20)
- `facetFilters`: Array of filter criteria
- `facets`: Facets to retrieve for filtering

**Example Response:**
```json
{
  "results": [{
    "hits": [
      {
        "objectID": "neJfyiF4ftJJQKxfKy5ZLq",
        "name": "Ultra Board® 15 U-1 (4 spartelkanter) | Produktdatablad | DK",
        "assetId": "abfa9e74-58c7-4257-b592-895b15155394",
        "language": "da",
        "documentTypes": ["product-data-sheet"],
        "fileFormat": "pdf",
        "fileSize": 231998,
        "pageCount": 1,
        "division": "Knauf Gypsum",
        "productNames": ["Ultra Board® 15 mm"],
        "url": "https://s7g10.scene7.com/is/content/knauf/ultra_board-082019_4_forsaenkede-kanterpdf"
      }
    ],
    "nbHits": 22,
    "page": 0,
    "nbPages": 2,
    "hitsPerPage": 20
  }]
}
```

### 2. Download Document

**GET** `/assets/{assetId}`

Download a specific document by its asset ID.

**Path Parameters:**
- `assetId`: Document asset ID (UUID format)

**Query Parameters:**
- `download`: Must be `true`
- `country`: Country code (e.g., `dk`)
- `locale`: Locale code (e.g., `da-DK`)

**Example:**
```
GET /assets/abfa9e74-58c7-4257-b592-895b15155394?download=true&country=dk&locale=da-DK
```

### 3. Download Archive

**GET** `/archive`

Create and download a ZIP archive with multiple selected documents.

**Query Parameters:**
- `country`: Country code (e.g., `dk`)
- `filename`: Archive name with timestamp (e.g., `Archive_20251114135305`)

## Filtering Options

### Document Types

- `technical-data-sheet` - Product datasheets
- `declaration-of-performance` - Performance declarations (DoP)
- `manual` - Installation and usage manuals
- `environmental-product-declaration` - EPD files
- `certificate` - Certifications and approvals
- `brochure` - Marketing brochures
- `safety-data-sheet` - Safety data sheets (SDS)
- `technical-drawing` - Technical drawings
- `product-specification` - Product specifications
- `assembly-instructions` - Assembly guides
- `fire-classification-report` - Fire safety reports
- `system-data-sheet` - System datasheets

### Languages

- `da` - Danish (Dansk)
- `en` - English
- `de` - German (Deutsch)
- `sv` - Swedish (Svenska)

### Divisions

- `Knauf Gypsum` - Gypsum board products
- `Knauf Insulation` - Insulation products
- `Knauf Ceiling Solutions` - Ceiling systems

### Product Categories (Level 0)

- Plader (Boards)
- Isolering (Insulation)
- Montage og fastgørelse (Mounting & fixing technology)
- Lofter (Ceilings)
- Profiler og understøtninger (Profiles and supports)

### Application Areas

**Indoor/Outdoor:**
- Indendørs (Interior)
- Udendørs (Exterior)

**Specific Fields:**
- Indervægge (Interior walls)
- Ydervægge / Facader (Exterior walls / Facades)
- Lofter (Ceilings)
- Gulve (Floors)
- Skråtage (Pitched roofs)
- Flade tage (Flat roofs)

## Usage Examples

See the [`examples/`](./examples/) directory for complete working examples in multiple programming languages:

- [JavaScript/Node.js](./examples/javascript.js)
- [Python](./examples/python.py)
- [cURL](./examples/curl.sh)

## Advanced Filtering

### Filter by Document Type and Language

```json
{
  "requests": [{
    "indexName": "prod_download_center_dk",
    "params": "query=&facetFilters=[[\"documentTypes:technical-data-sheet\"],[\"language:da\",\"language:en\"]]"
  }]
}
```

### Filter by Product Category

```json
{
  "requests": [{
    "indexName": "prod_download_center_dk",
    "params": "query=gips&facetFilters=[[\"productCategories.lvl0.da:Plader\"],[\"language:da\"]]"
  }]
}
```

### Get Facet Counts

```json
{
  "requests": [{
    "indexName": "prod_download_center_dk",
    "params": "hitsPerPage=0&facets=[\"documentTypes\",\"language\",\"division\"]"
  }]
}
```

## Response Fields

### Document Object

| Field | Type | Description |
|-------|------|-------------|
| `objectID` | string | Unique Algolia object ID |
| `name` | string | Document title |
| `assetId` | string | UUID for downloading |
| `language` | string | Primary language code |
| `documentTypes` | array | Document type classifications |
| `fileFormat` | string | File extension (pdf, zip, xls) |
| `fileSize` | integer | Size in bytes |
| `pageCount` | integer | Number of pages (PDFs) |
| `lastUpdated` | integer | Unix timestamp (milliseconds) |
| `division` | string | Knauf business division |
| `productNames` | array | Associated product names |
| `url` | string | CDN URL to the document |
| `clickCount` | integer | Download popularity metric |

## Rate Limiting

The Algolia API has built-in rate limiting. For production use, consider implementing:
- Request throttling
- Caching of search results
- Retry logic with exponential backoff

## Error Handling

### Common Errors

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid query parameters |
| 403 | Forbidden - Invalid API key |
| 404 | Not Found - Document doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |

### Error Response Format

```json
{
  "message": "Invalid API key",
  "status": 403
}
```

## Best Practices

1. **Cache Results**: Cache search results to reduce API calls
2. **Use Facets Wisely**: Request only the facets you need
3. **Implement Pagination**: Don't request all results at once
4. **Handle Errors Gracefully**: Implement retry logic for transient failures
5. **Monitor Usage**: Track API usage to stay within rate limits

## Support

For technical support or questions about Knauf products:

- **Email**: kundeservice-dk@knauf.com
- **Phone**: +45 96573030
- **Website**: [https://knauf.com/da-DK/kontakt-knauf-afdeling](https://knauf.com/da-DK/kontakt-knauf-afdeling)

## Additional Resources

- [OpenAPI Specification](./openapi.yaml)
- [Technical Workbook](./workbook.md)
- [Code Examples](./examples/)
- [Knauf Denmark Website](https://knauf.com/da-DK/knauf-gips)
- [Download Center Web Interface](https://knauf.com/da-DK/tools/download-center)

## License

This documentation is provided for integration purposes. The Knauf Denmark Download Center API and all associated content are owned by Knauf.

## Changelog

### Version 1.0.0 (2025-11-14)
- Initial documentation release
- Complete API mapping
- OpenAPI 3.0 specification
- Code examples in multiple languages
