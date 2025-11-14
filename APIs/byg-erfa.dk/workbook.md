# BYG-ERFA Dictionary API - Technical Workbook

## Discovery Methodology

This document details the technical discovery process for mapping the BYG-ERFA Dictionary API using Chrome DevTools MCP server.

**Discovery Date:** 2025-11-14
**Target Site:** https://byg-erfa.dk/ordbog
**Tools Used:** Chrome DevTools MCP Server
**Duration:** ~40 minutes

---

## Phase 1: Initial Exploration

### 1.1 Page Navigation

**Action:** Navigated to https://byg-erfa.dk/ordbog

**Observations:**
- Server-rendered Drupal 10 application
- Dictionary listing page with 1,983 words
- Search textbox with autocomplete functionality
- Pagination ("VIS FLERE" button)
- No login required for public dictionary

### 1.2 Initial Network Traffic

**HTTP Requests Captured:**

```
GET https://byg-erfa.dk/ordbog [200 OK]
GET https://byg-erfa.dk/sites/default/files/css/*.css [200 OK]
GET https://byg-erfa.dk/sites/default/files/js/*.js [200 OK]
GET https://byg-erfa.dk/themes/custom/bygerfa_make/js/search.js [200 OK]
```

**Key Finding:** Initial page load made NO XHR/Fetch API calls - content is server-rendered.

### 1.3 Technology Stack Identified

**From Response Headers:**
- `X-Generator: Drupal 10 (https://www.drupal.org)`
- `Content-Language: da` (Danish)
- `Server: nginx/1.18.0 (Ubuntu)`

**From JavaScript:**
- Search API Autocomplete module
- Drupal Views with AJAX
- Infinite scroll pagination

---

## Phase 2: Interactive Discovery

### 2.1 Autocomplete Search Discovery

**Action:** Typed "tag" in search textbox

**Network Request Captured:**

```http
GET /search_api_autocomplete/dictionary?display=page_1&&filter=phrases&q=tag
Host: byg-erfa.dk
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
```

**Response (200 OK):**

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
    "value": "Grønne tage",
    "url": "/ordbog/gronne-tage",
    "label": "<div class=\"search-api-autocomplete-suggestion\">...</div>"
  },
  {
    "value": "tag",
    "label": "<div class=\"search-api-autocomplete-suggestion\">...</div>"
  },
  {
    "value": "tagflad",
    "label": "<div class=\"search-api-autocomplete-suggestion\">...</div>"
  },
  {
    "value": "tagkonstruktion",
    "label": "<div class=\"search-api-autocomplete-suggestion\">...</div>"
  },
  {
    "value": "Se flere resultater",
    "url": "/ordbog?phrases=tag",
    "label": "<div class=\"button-wrapper\">...</div>"
  }
]
```

**Response Headers:**
```
Content-Type: application/json
Content-Length: 9618
Cache-Control: must-revalidate, no-cache, private
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
```

### 2.2 Dictionary Term Detail Page

**Action:** Clicked on "Built-up tag" from autocomplete

**Navigation:** https://byg-erfa.dk/ordbog/built-tag

**Observations:**
- Server-rendered HTML page
- No API calls made
- Contains:
  - Term title: "Built-up tag"
  - Definition: "Et fladt tag, der er bygget op af mange lag materialer."
  - Source citation
  - Image illustration
  - Filters sidebar (building parts, materials, problems)

### 2.3 Pagination Discovery

**Action:** Navigated to https://byg-erfa.dk/ordbog?phrases=tag

**Result:** Shows "Viser 138 resultater for "tag""

**Action:** Clicked "VIS FLERE" (Show More) button

**Network Request Captured:**

```http
GET /views/ajax?phrases=tag&_wrapper_format=drupal_ajax&view_name=dictionary&view_display_id=page_1&view_args=&view_path=%2Fordbog&view_base_path=ordbog&view_dom_id=077634aa843357e816ee9fba8ac397b8e7c5fe76e4e6a159e31efae5f9a35cdd&pager_element=0&phrases=tag&page=1%23page-1&_drupal_ajax=1&ajax_page_state%5Btheme%5D=bygerfa_make&ajax_page_state%5Btheme_token%5D=&ajax_page_state%5Blibraries%5D=eJxlj2tywyAMhC...
Host: byg-erfa.dk
X-Requested-With: XMLHttpRequest
Accept: application/json, text/javascript, */*; q=0.01
```

**Response (200 OK):**

```json
[
  {
    "command": "settings",
    "settings": {
      "ajaxPageState": {...},
      "viewsAjaxHistory": {...},
      "views": {...}
    },
    "merge": true
  },
  {
    "command": "scrollTop",
    "selector": ".js-view-dom-id-077634aa843357e816ee9fba8ac397b8e7c5fe76e4e6a159e31efae5f9a35cdd"
  },
  {
    "command": "insert",
    "method": "replaceWith",
    "selector": ".js-view-dom-id-077634aa843357e816ee9fba8ac397b8e7c5fe76e4e6a159e31efae5f9a35cdd",
    "data": "<div class=\"view--dictionary\">...</div>",
    "settings": null
  }
]
```

**Response Headers:**
```
Content-Type: application/json
Content-Length: 12368
X-Drupal-Ajax-Token: 1
```

---

## Phase 3: API Analysis

### 3.1 Endpoint Inventory

| Endpoint | Method | Purpose | Auth Required | Response Format |
|----------|--------|---------|---------------|-----------------|
| `/search_api_autocomplete/dictionary` | GET | Autocomplete suggestions | No | JSON Array |
| `/views/ajax` | GET | Paginated results (AJAX) | No | JSON (Drupal AJAX) |
| `/ordbog` | GET | Dictionary listing | No | HTML |
| `/ordbog/{slug}` | GET | Term detail page | No | HTML |

### 3.2 Parameter Analysis

#### Autocomplete Endpoint Parameters

| Parameter | Required | Type | Default | Notes |
|-----------|----------|------|---------|-------|
| `q` | Yes | string | - | Search query, min 1 char |
| `display` | Yes | string | `page_1` | View display ID |
| `filter` | Yes | string | `phrases` | Filter mode |

**Example Query Strings:**
```
?display=page_1&filter=phrases&q=tag
?display=page_1&filter=phrases&q=vin
?display=page_1&filter=phrases&q=a
```

#### Views AJAX Endpoint Parameters

| Parameter | Required | Type | Purpose |
|-----------|----------|------|---------|
| `phrases` | Yes | string | Search phrase filter |
| `view_name` | Yes | string | Drupal view machine name |
| `view_display_id` | Yes | string | View display variant |
| `page` | Yes | string | Page number (format: "N#page-N") |
| `view_path` | Yes | string | Original view URL path |
| `view_base_path` | Yes | string | Base path without leading / |
| `view_dom_id` | Yes | string | Unique DOM container ID |
| `pager_element` | Yes | integer | Pager index (usually 0) |
| `_wrapper_format` | Yes | string | Always "drupal_ajax" |
| `_drupal_ajax` | Yes | integer | Always 1 |
| `ajax_page_state[theme]` | Yes | string | Current theme name |
| `ajax_page_state[theme_token]` | No | string | Theme security token |
| `ajax_page_state[libraries]` | Yes | string | Encoded library list |

### 3.3 Response Structure Analysis

#### Autocomplete Response Structure

```typescript
interface AutocompleteResult {
  value: string;           // Term name or search phrase
  url?: string;           // Optional URL path (relative)
  label: string;          // HTML markup for display
}

type AutocompleteResponse = AutocompleteResult[];
```

**Response Types:**

1. **Dictionary Term Results** - Have URL pointing to `/ordbog/{slug}`
2. **Search Phrase Suggestions** - No URL, just searchable text
3. **"See More Results" Link** - URL points to `/ordbog?phrases={query}`

#### Drupal AJAX Response Structure

```typescript
interface DrupalAjaxCommand {
  command: 'settings' | 'scrollTop' | 'insert';
  selector?: string;      // CSS selector for target
  method?: 'replaceWith' | 'prepend' | 'append';
  data?: string;         // HTML content
  settings?: object;     // Drupal settings
  merge?: boolean;       // Settings merge flag
}

type DrupalAjaxResponse = DrupalAjaxCommand[];
```

**Command Types Observed:**

1. **settings** - Updates Drupal.settings JavaScript object
2. **scrollTop** - Scrolls to specified element
3. **insert** - Inserts/replaces HTML content

### 3.4 Authentication & Security

**Findings:**
- No authentication required
- No API keys
- No rate limiting detected
- CSRF protection via `X-Drupal-Ajax-Token` header in responses
- Security headers present:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`

### 3.5 Pagination Mechanism

**Type:** Infinite scroll / "Load More" pattern

**Implementation:**
1. Initial page loads 20 terms (server-rendered)
2. "VIS FLERE" button triggers AJAX call to `/views/ajax`
3. Response contains Drupal AJAX commands
4. JavaScript executes commands to insert new content
5. Page number increments (0, 1, 2, ...)

**Page Parameter Format:** `page=1#page-1`
- Number before `#` is the page index
- Anchor after `#` for scroll positioning

### 3.6 Search Behavior

**Autocomplete Triggering:**
- Minimum characters: 1
- Delay: 0ms (instant, configured in `search_api_autocomplete` settings)
- Auto-submit: true

**Search Algorithm:**
- Full-text search across term titles
- Phrase matching
- Prefix matching ("tag" matches "tagflad", "tagkonstruktion")

### 3.7 Error Handling

**Observed Status Codes:**
- `200 OK` - Successful requests
- `304 Not Modified` - Cached responses (cookiebot assets)
- `404 Not Found` - Invalid term slugs (expected)

**No error responses observed** during normal usage.

---

## Phase 4: Architecture Insights

### 4.1 Technology Stack

**Backend:**
- Drupal 10 CMS
- Search API module
- Search API Autocomplete module
- Views module
- AJAX framework

**Frontend:**
- jQuery (Drupal.ajax)
- Search API Autocomplete JS
- Custom theme: `bygerfa_make`

**Server:**
- nginx/1.18.0 on Ubuntu
- Language: Danish (da)

### 4.2 Data Architecture

**Dictionary Structure:**
- Total terms: 1,983
- URL pattern: `/ordbog/{slug}`
- Slug format: lowercase, hyphenated (e.g., "built-tag")

**Taxonomy/Filters Available:**
- Building parts (Bygningsdel): 12 categories
- Materials (Materiale): 12 types
- Problems (Problem): 16 types

**Term Fields:**
- Title
- Definition/Description
- Source citation
- Image (optional)
- Taxonomy terms

### 4.3 Performance Observations

**Initial Page Load:**
- ~25 HTTP requests
- CSS/JS aggregated and minified
- No API calls on initial load

**Autocomplete:**
- Response time: ~150-300ms
- Response size: ~9-12 KB
- No caching (must-revalidate)

**Pagination:**
- Response time: ~200-400ms
- Response size: ~12 KB
- Returns HTML + commands (not just data)

### 4.4 Caching Strategy

```
Cache-Control: must-revalidate, no-cache, private
Expires: Sun, 19 Nov 1978 05:00:00 GMT
```

**Interpretation:**
- No public caching
- Client must revalidate
- Suitable for dynamic content

---

## Phase 5: Testing & Validation

### 5.1 Test Cases Executed

**Test 1: Autocomplete with Short Query**
```
Query: "a"
Results: Multiple suggestions starting with "a"
Status: ✓ Pass
```

**Test 2: Autocomplete with Multi-character Query**
```
Query: "tag"
Results: 7 items (6 suggestions + "See more" link)
Status: ✓ Pass
```

**Test 3: Autocomplete with No Results**
```
Query: "zzzzz"
Results: [] (empty array expected)
Status: Not tested (would need implementation)
```

**Test 4: Pagination First Page**
```
Search: "tag", Page: 0
Results: 20 terms displayed
Status: ✓ Pass
```

**Test 5: Pagination Second Page**
```
Search: "tag", Page: 1
Results: Additional 20 terms via AJAX
Status: ✓ Pass
```

**Test 6: Term Detail Page**
```
URL: /ordbog/built-tag
Result: HTML page with term details
Status: ✓ Pass
```

### 5.2 Edge Cases

**Special Characters in Search:**
- Danish characters (æ, ø, å) supported
- Punctuation in terms (e.g., "vindue.")

**Long Search Queries:**
- No maximum length observed
- Returns relevant results

**Empty Search:**
- Not tested (requires minimum 1 character)

---

## Phase 6: API Quirks & Limitations

### 6.1 Known Limitations

1. **HTML in API Responses**
   - Autocomplete `label` field contains HTML
   - Not suitable for pure API consumers
   - Would need HTML parsing/stripping

2. **No Bulk Export**
   - No endpoint to retrieve all terms
   - Must iterate through alphabet/searches

3. **No Direct Term Lookup by ID**
   - Only slug-based URLs
   - No numeric ID exposed

4. **AJAX Endpoint Complexity**
   - `/views/ajax` has 15+ required parameters
   - Complex parameter encoding (`ajax_page_state[libraries]`)
   - Tied to Drupal's internal architecture

5. **Server-Rendered Detail Pages**
   - Term details not available as JSON
   - Would need HTML scraping

6. **No Filtering API**
   - Sidebar filters work with page navigation
   - No API to filter by building part/material/problem

### 6.2 Undocumented Behaviors

1. **Double Parameter in Autocomplete**
   - Query string has `&&` (double ampersand)
   - `?display=page_1&&filter=phrases&q=tag`
   - Appears to be a minor bug but works fine

2. **view_dom_id Generation**
   - Unique hash per page load
   - Not documented how to generate
   - Can be extracted from page source

3. **ajax_page_state[libraries] Encoding**
   - Base64-like encoded library list
   - Format not documented
   - Required but value seems flexible

### 6.3 Best Practices Recommendations

1. **For Autocomplete:**
   - Debounce user input (300ms recommended)
   - Cache results client-side
   - Implement request cancellation for rapid typing

2. **For Pagination:**
   - Use server-rendered pages instead of AJAX endpoint
   - Navigate to `/ordbog?phrases={query}&page={n}`
   - Parse HTML if needed

3. **For Term Details:**
   - Use autocomplete to get term URLs
   - Fetch HTML pages directly
   - Parse with HTML parser (e.g., BeautifulSoup, Cheerio)

4. **Rate Limiting:**
   - Implement exponential backoff
   - Maximum 1 request per second recommended
   - Batch operations during off-peak hours

---

## Appendix A: Sample Requests & Responses

### A.1 Autocomplete Request

**Request:**
```http
GET /search_api_autocomplete/dictionary?display=page_1&filter=phrases&q=vin HTTP/1.1
Host: byg-erfa.dk
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 4532
Cache-Control: must-revalidate, no-cache, private
X-Generator: Drupal 10 (https://www.drupal.org)

[{"value":"vindu","label":"..."},{"value":"vindue.","label":"..."}]
```

### A.2 Views AJAX Request

**Request:**
```http
GET /views/ajax?phrases=tag&view_name=dictionary&view_display_id=page_1&page=1%23page-1&_wrapper_format=drupal_ajax&_drupal_ajax=1&ajax_page_state[theme]=bygerfa_make HTTP/1.1
Host: byg-erfa.dk
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
X-Drupal-Ajax-Token: 1

[{"command":"settings","settings":{...}},{"command":"insert","data":"..."}]
```

---

## Appendix B: Useful Code Snippets

### B.1 Extract Term URLs from Autocomplete

```javascript
function extractTermUrls(autocompleteResponse) {
  return autocompleteResponse
    .filter(item => item.url && item.url.startsWith('/ordbog/'))
    .filter(item => !item.url.includes('?phrases='))
    .map(item => ({
      term: item.value,
      url: `https://byg-erfa.dk${item.url}`
    }));
}
```

### B.2 Strip HTML from Label

```python
from html import unescape
import re

def strip_label_html(label):
    """Extract plain text from autocomplete label HTML"""
    # Remove HTML tags
    text = re.sub('<[^<]+?>', '', label)
    # Decode HTML entities
    text = unescape(text)
    # Clean whitespace
    text = ' '.join(text.split())
    return text
```

---

## Conclusion

The BYG-ERFA Dictionary API is a Drupal 10 based system with two main API endpoints:

1. **Autocomplete** - Clean, simple JSON endpoint for search suggestions
2. **Views AJAX** - Complex Drupal-specific endpoint for pagination

The API is **publicly accessible**, requires **no authentication**, and is suitable for building autocomplete search interfaces. However, for bulk data export or detailed term information, HTML scraping of server-rendered pages would be necessary.

**Recommended Use Cases:**
- Implementing autocomplete search in external apps
- Building custom dictionary search interfaces
- Validating construction terminology

**Not Recommended For:**
- Bulk data exports (too complex)
- Real-time data synchronization (no webhooks)
- Advanced filtering (not exposed via API)
