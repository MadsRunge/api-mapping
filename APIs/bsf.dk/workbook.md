# Workbook: BSF.dk API Discovery

This document details the process of discovering and mapping the BSF.dk API.

## 1. Initial Exploration

- **Date:** 2025-11-14
- **Tooling:** Gemini CLI with Chrome DevTools MCP

### Steps

1.  Navigated to `https://bsf.dk/`.
2.  Captured initial network traffic.
3.  Identified the API base URL as `https://bsf.dk/ubaseline/api`.
4.  No authentication method was found.
5.  Listed all initial API endpoints called:
    - `GET /localization/getAll`
    - `GET /siteSettings/get`
    - `GET /navigation/getTopNavigation`
    - `GET /BsfNavigation/GetMobileTreeNavigation`
    - `POST /NewsPreview/GetNewsPreviews`
    - `GET /newsletter/panel`

## 2. Interactive Discovery

### Search

1.  Navigated to the search page at `https://bsf.dk/search`.
2.  Entered "test" into the search box and clicked the search button.
3.  Captured the following API call:
    - **Endpoint:** `POST /BsfSearchApi/Search`
    - **Request Body:** `{"query":"test","page":0,"tagCategoryIds":[],"tagIds":[],"searchableTypes":[]}`
4.  Clicked the "Nybyggeri" checkbox to filter the search.
5.  Captured the following API call:
    - **Endpoint:** `POST /BsfSearchApi/Search`
    - **Request Body:** `{"query":"test","page":0,"tagCategoryIds":[3575],"tagIds":[],"searchableTypes":[]}`

## 3. API Analysis

### `POST /BsfSearchApi/Search`

- **Method:** `POST`
- **URL:** `https://bsf.dk/ubaseline/api/BsfSearchApi/Search`
- **Request Body:**
  ```json
  {
    "query": "string",
    "page": "integer",
    "tagCategoryIds": ["integer"],
    "tagIds": ["integer"],
    "searchableTypes": ["string"]
  }
  ```
- **Response Body:**
  ```json
  {
    "suggestionText": "string",
    "items": [
      {
        "isObsolete": "boolean",
        "publishDate": "string",
        "type": "string",
        "urlTarget": "string",
        "isSuggestion": "boolean",
        "title": "string",
        "description": "string",
        "url": "string"
      }
    ],
    "totalResultCount": "integer",
    "pageCount": "integer"
  }
  ```

### `POST /NewsPreview/GetNewsPreviews`

- **Method:** `POST`
- **URL:** `https://bsf.dk/ubaseline/api/NewsPreview/GetNewsPreviews`
- **Request Body:**
    ```json
    {
      "year": "integer",
      "index": "integer",
      "step": "integer"
    }
    ```
- **Response Body:**
    ```json
    {
      "totalCount": "integer",
      "years": ["integer"],
      "items": [
        {
          "title": "string",
          "description": "string",
          "publishDate": "string",
          "publishDateString": "string",
          "previewImage": {
            "src": "string",
            "alt": "string",
            "width": "integer",
            "height": "integer",
            "sources": [
              {
                "media": "string",
                "srcSet": "string",
                "alias": "string"
              }
            ]
          },
          "url": "string"
        }
      ],
      "newsOverviewPageUrl": "string"
    }
    ```
