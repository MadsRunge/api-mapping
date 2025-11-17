# Rockwool Product API

This document provides an overview of the Rockwool Product API, which can be used to search and filter Rockwool products.

## API Overview

The API has two main endpoints:

- **Filter:** `https://searchserver.rockwoolgroup.com/api/filter`
- **Search:** `https://searchserver.rockwoolgroup.com/api/search`
- **Method:** `POST`
- **Authentication:** None

## Quick Start

### Filtering Products

Here is a quick example of how to use the API to fetch a list of products.

```bash
curl -X POST 'https://searchserver.rockwoolgroup.com/api/filter' \
-H 'Content-Type: application/json' \
-d '{
  "facetFields": ["productCategories"],
  "returnFields": [],
  "page": 0,
  "count": 10,
  "filterCategory": "2dc98273-1bcc-4333-9302-cdee56ea54d8||Udvendig tagisolering",
  "notSelfExcludeFilters": true,
  "multiSelectFilters": [],
  "filters": [],
  "culture": "da-DK",
  "languageCode": "da",
  "site": "ROCKWOOL"
}'
```

### Searching Content

Here is a quick example of how to use the API to search for content.

```bash
curl -X POST 'https://searchserver.rockwoolgroup.com/api/search' \
-H 'Content-Type: application/json' \
-d '{
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
}'
```

## Endpoint Summary

| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| `POST` | `/api/filter`  | Filter and search for products |
| `POST` | `/api/search`  | Search for content           |

## Common Use Cases

- Fetch a list of products in a specific category.
- Paginate through product results.
- Get facet counts for product categories.
- Search for content across the site.
