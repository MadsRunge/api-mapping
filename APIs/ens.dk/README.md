# ens.dk API Documentation

This document provides an overview of the public API for the [ens.dk](https://ens.dk) website.

## API Overview

The ens.dk website is built on Drupal. The API is public and does not require authentication for most endpoints.

### Base URL

The base URL for the API is:

```
https://ens.dk
```

## Key Endpoints

Below are some of the key API endpoints that have been identified.

### Get Sitewide Alerts

*   **Endpoint:** `GET /sitewide_alert/load`
*   **Description:** Retrieves a list of sitewide alerts.
*   **cURL Example:**
    ```bash
    curl https://ens.dk/sitewide_alert/load
    ```

### Search

*   **Endpoint:** `GET /search/node`
*   **Description:** Performs a search on the website.
*   **Parameters:**
    *   `keys`: The search keyword.
*   **cURL Example:**
    ```bash
    curl "https://ens.dk/search/node?keys=test"
    ```
