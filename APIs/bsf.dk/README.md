# BSF.dk API

This document provides an overview of the public API for the BSF.dk website.

## API Overview

The API provides access to various resources on the BSF.dk website, including news, search, and navigation.

## Authentication

The API is public and does not require authentication.

## Endpoints

| Method | Path                                  | Description                  |
|--------|---------------------------------------|------------------------------|
| GET    | /localization/getAll                  | Get all localization strings |
| GET    | /siteSettings/get                     | Get site settings            |
| GET    | /navigation/getTopNavigation          | Get top navigation links     |
| GET    | /BsfNavigation/GetMobileTreeNavigation| Get mobile tree navigation   |
| POST   | /NewsPreview/GetNewsPreviews          | Get news previews            |
| GET    | /newsletter/panel                     | Get newsletter panel         |
| POST   | /BsfSearchApi/Search                  | Search the site              |

## Quick Start Examples

### Search the site

```bash
curl -X POST https://bsf.dk/ubaseline/api/BsfSearchApi/Search \
-H "Content-Type: application/json" \
-d '{"query":"test","page":0,"tagCategoryIds":[],"tagIds":[],"searchableTypes":[]}'
```

### Get news previews

```bash
curl -X POST https://bsf.dk/ubaseline/api/NewsPreview/GetNewsPreviews \
-H "Content-Type: application/json" \
-d '{"year":null,"index":0,"step":3}'
```

