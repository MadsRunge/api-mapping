# BYG-ERFA Dictionary API Documentation

## Overview

The BYG-ERFA Dictionary API provides access to a comprehensive Danish construction terminology dictionary containing over 1,983 technical building terms. The API is built on Drupal 10 using the Search API and Views modules.

**Base URL:** `https://byg-erfa.dk`

**Site:** [https://byg-erfa.dk/ordbog](https://byg-erfa.dk/ordbog)

## Key Features

- **No Authentication Required** - All endpoints are publicly accessible
- **Autocomplete Search** - Real-time search suggestions as you type
- **AJAX Pagination** - Infinite scroll with dynamic content loading
- **Multilingual Support** - Content primarily in Danish (da)
- **Server-Rendered Pages** - Dictionary pages are HTML, not pure REST API

## Quick Start

### Get Autocomplete Suggestions

```bash
curl "https://byg-erfa.dk/search_api_autocomplete/dictionary?display=page_1&filter=phrases&q=tag"
```

**Response:**
```json
[
  {
    "value": "Brudt tag",
    "url": "/ordbog/brudt-tag",
    "label": "<div class=\"search-api-autocomplete-suggestion\">...</div>"
  },
  {
    "value": "Built-up tag",
    "url": "/ordbog/built-tag",
    "label": "<div class=\"search-api-autocomplete-suggestion\">...</div>"
  },
  {
    "value": "tag",
    "label": "<div class=\"search-api-autocomplete-suggestion\">...</div>"
  }
]
```

## API Endpoints

### 1. Autocomplete Search

**Endpoint:** `GET /search_api_autocomplete/dictionary`

**Purpose:** Get real-time autocomplete suggestions for dictionary terms

**Parameters:**

| Parameter | Type   | Required | Description                           | Example   |
|-----------|--------|----------|---------------------------------------|-----------|
| q         | string | Yes      | Search query (min 1 character)        | tag       |
| display   | string | Yes      | Display mode                          | page_1    |
| filter    | string | Yes      | Filter type                           | phrases   |

**Example:**
```bash
curl "https://byg-erfa.dk/search_api_autocomplete/dictionary?display=page_1&filter=phrases&q=vin"
```

**Response Fields:**

- `value` - The dictionary term or search phrase
- `url` - Path to the term detail page (optional)
- `label` - HTML markup for displaying the suggestion

---

### 2. Paginated Dictionary Results (AJAX)

**Endpoint:** `GET /views/ajax`

**Purpose:** Load additional dictionary results for pagination

**Parameters:**

| Parameter              | Type    | Required | Description                    | Example    |
|------------------------|---------|----------|--------------------------------|------------|
| phrases                | string  | Yes      | Search phrase                  | tag        |
| view_name              | string  | Yes      | View machine name              | dictionary |
| view_display_id        | string  | Yes      | View display ID                | page_1     |
| page                   | string  | Yes      | Page number (format: "N#page-N")| 1#page-1  |
| view_path              | string  | Yes      | View path                      | /ordbog    |
| view_base_path         | string  | Yes      | View base path                 | ordbog     |
| view_dom_id            | string  | Yes      | DOM container ID               | (hash)     |
| _wrapper_format        | string  | Yes      | Wrapper format                 | drupal_ajax|
| _drupal_ajax           | integer | Yes      | AJAX flag                      | 1          |
| ajax_page_state[theme] | string  | Yes      | Theme name                     | bygerfa_make|

**Example:**
```bash
curl "https://byg-erfa.dk/views/ajax?phrases=tag&view_name=dictionary&view_display_id=page_1&page=1%23page-1&view_path=/ordbog&view_base_path=ordbog&view_dom_id=abc123&_wrapper_format=drupal_ajax&_drupal_ajax=1&ajax_page_state[theme]=bygerfa_make&ajax_page_state[theme_token]=&ajax_page_state[libraries]=..."
```

**Response:** Array of Drupal AJAX commands (insert, settings, scrollTop)

---

### 3. Dictionary Listing Page

**Endpoint:** `GET /ordbog`

**Purpose:** View dictionary terms (server-rendered HTML)

**Parameters:**

| Parameter | Type    | Required | Description           | Example |
|-----------|---------|----------|-----------------------|---------|
| phrases   | string  | No       | Search filter         | tag     |
| page      | integer | No       | Page number (0-based) | 0       |

**Example:**
```bash
curl "https://byg-erfa.dk/ordbog?phrases=tag&page=0"
```

---

### 4. Dictionary Term Detail

**Endpoint:** `GET /ordbog/{term-slug}`

**Purpose:** View a specific dictionary term's definition

**Example:**
```bash
curl "https://byg-erfa.dk/ordbog/built-tag"
```

## Common Use Cases

### Use Case 1: Implement Autocomplete Search

```javascript
async function searchDictionary(query) {
  const url = `https://byg-erfa.dk/search_api_autocomplete/dictionary?display=page_1&filter=phrases&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const suggestions = await response.json();

  // Filter out the "See more results" link
  return suggestions.filter(item => item.url && item.url.startsWith('/ordbog/'));
}

// Usage
const results = await searchDictionary('tag');
console.log(results);
```

### Use Case 2: Search and Navigate to Term

```python
import requests

def find_term(search_query):
    """Search for a term and get the first result's URL"""
    url = f"https://byg-erfa.dk/search_api_autocomplete/dictionary"
    params = {
        'display': 'page_1',
        'filter': 'phrases',
        'q': search_query
    }

    response = requests.get(url, params=params)
    results = response.json()

    # Get first dictionary term (not search phrase)
    for item in results:
        if 'url' in item and item['url'].startswith('/ordbog/') and item['url'] != f'/ordbog?phrases={search_query}':
            return f"https://byg-erfa.dk{item['url']}"

    return None

# Usage
term_url = find_term('vindue')
print(f"Term URL: {term_url}")
```

### Use Case 3: Bulk Dictionary Export

```bash
#!/bin/bash
# Export all terms starting with a specific letter

QUERY="a"
OUTPUT="dictionary_a.json"

curl -s "https://byg-erfa.dk/search_api_autocomplete/dictionary?display=page_1&filter=phrases&q=${QUERY}" \
  | jq '[.[] | select(.url != null and (.url | startswith("/ordbog?phrases=")) | not)]' \
  > $OUTPUT

echo "Exported to $OUTPUT"
```

## Response Headers

All API responses include these headers:

- `Content-Type: application/json`
- `Content-Language: da` (Danish)
- `X-Generator: Drupal 10 (https://www.drupal.org)`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Cache-Control: must-revalidate, no-cache, private`

## Rate Limiting

No explicit rate limiting is documented. Please be respectful:
- Implement reasonable delays between requests
- Cache results when possible
- Don't scrape the entire dictionary at once

## Error Handling

The API returns standard HTTP status codes:

- `200 OK` - Successful request
- `304 Not Modified` - Cached response
- `404 Not Found` - Term or page not found

## Data Structure

### Autocomplete Result Object

```json
{
  "value": "Built-up tag",
  "url": "/ordbog/built-tag",
  "label": "<div class=\"search-api-autocomplete-suggestion\">...</div>"
}
```

### Drupal AJAX Command Object

```json
{
  "command": "insert",
  "method": "replaceWith",
  "selector": ".js-view-dom-id-...",
  "data": "<div>...</div>",
  "settings": null
}
```

## Notes and Limitations

1. **HTML in Responses** - The `label` field contains HTML markup, you'll need to parse it or display it in a web context
2. **No Bulk Export API** - There's no dedicated endpoint for exporting all terms
3. **Server-Rendered Pages** - Dictionary detail pages are HTML, not JSON
4. **Danish Language** - All content is in Danish
5. **No Versioning** - The API doesn't have version numbers in URLs
6. **Session-less** - No authentication or session management required

## Support

- **Website:** [https://byg-erfa.dk](https://byg-erfa.dk)
- **Email:** info@byg-erfa.dk
- **Phone:** +45 82 30 30 22
- **Address:** Ny Kongensgade 13, 1472 København K, Denmark

## Additional Resources

- [OpenAPI Specification](./openapi.yaml) - Complete API specification
- [Workbook](./workbook.md) - Technical discovery notes
- [Examples](./examples/) - Code examples in multiple languages
- [FAQ](https://byg-erfa.dk/faq) - BYG-ERFA FAQ

## License

The BYG-ERFA Dictionary API and content are proprietary. See their [terms and conditions](https://byg-erfa.dk/handelsbetingelser) for usage rights.
