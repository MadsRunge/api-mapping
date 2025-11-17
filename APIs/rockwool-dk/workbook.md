# API Discovery Workbook: Rockwool Products

This workbook details the process of discovering and mapping the Rockwool Product API.

## 1. Initial Exploration

- **Date:** 2025-11-17
- **Tooling:** Gemini CLI with Chrome DevTools MCP

### Steps Taken

1.  Navigated to `https://www.rockwool.com/dk/produkter-og-konstruktioner/`.
2.  Captured initial network traffic.
3.  Identified `https://www.rockwool.com/api/` as a potential API base URL.
4.  Observed initial API calls:
    - `GET /api/Visitor/GetCurrentViewer`
    - `GET /api/CountryRedirect/GetRedirectContent`
5.  No authentication method was immediately apparent.

## 2. Interactive Discovery

1.  Took a snapshot of the initial page to identify interactive elements.
2.  Clicked on the "Tagisolering" (Roofing insulation) category link.
3.  Observed that the `pageId` in the `/api/CountryRedirect/GetRedirectContent` call changed.
4.  Navigated to the "Produkter" (Products) page within the "Tagisolering" category.
5.  Took a snapshot of the product listing page.
6.  Identified a "Hent flere" (Load more) button.
7.  Clicked the "Hent flere" button and observed a new API call.

## 3. API Analysis

### Key Discoveries

#### Product Filtering

The "Hent flere" button on product listing pages triggered a `POST` request to a new endpoint:

- **URL:** `https://searchserver.rockwoolgroup.com/api/filter`
- **Method:** `POST`

##### Request Analysis

- **Headers:**
  - `Content-Type: application/json`
- **Body:**

```json
{
  "facetFields": ["productCategories"],
  "returnFields": [],
  "page": 1,
  "count": 6,
  "filterCategory": "2dc98273-1bcc-4333-9302-cdee56ea54d8||Udvendig tagisolering",
  "notSelfExcludeFilters": true,
  "multiSelectFilters": [],
  "filters": [],
  "culture": "da-DK",
  "languageCode": "da",
  "site": "ROCKWOOL"
}
```

##### Response Analysis

The response is a JSON object containing:

- `facetFields`: Facet counts for product categories.
- `totalCount`: Total number of matching products.
- `contents`: An array of product objects with details like `id`, `name`, `url`, `excerpt`, and `image`.

#### Content Search

The search input in the header triggered a `POST` request to a new endpoint:

- **URL:** `https://searchserver.rockwoolgroup.com/api/search`
- **Method:** `POST`

##### Request Analysis

- **Headers:**
  - `Content-Type: application/json`
- **Body:**

```json
{
  "brandsInsideCulture": ["Rockfon", "Lapinus", "Rockpanel", "ROCKWOOL", "ROCKWOOL Rainwater Systems", "ROCKWOOL Prefab Building Systems"],
  "brandsOutsideCulture": ["Grodan", "ROCKWOOL RTI", "Grodan 101", "ROCKWOOL Core Solutions"],
  "count": 10,
  "onlySameSite": false,
  "query": "isolering",
  "page": 1,
  "languageCode": "da",
  "site": "ROCKWOOL",
  "culture": "da-DK",
  "searchPage": "https://www.rockwool.com/dk/soeg/",
  "unitSystem": "Metric"
}
```

##### Response Analysis

The response is a JSON object containing:

- `totalCount`: The total number of search results.
- `averageScore`: The average score of the search results.
- `documents`: An array of search result objects.

## 4. Documentation Generation

Based on the analysis, the following files were created and updated:

- `openapi.yaml`: A complete OpenAPI 3.0 specification for the `/api/filter` and `/api/search` endpoints.
- `README.md`: User-friendly documentation with an overview, quick start guide, and examples for both endpoints.
- `workbook.md`: This document, detailing the discovery process.
