# Træinfo.dk API Documentation

This document provides an overview of the public API for the [traeinfo.dk](https://traeinfo.dk) website.

## API Overview

The traeinfo.dk website is built on WordPress and utilizes the WordPress REST API for data retrieval. The API is public and does not require authentication for most endpoints.

### Base URL

The base URL for the API is:

```
https://traeinfo.dk/wp-json/
```

## Key Endpoints

Below are some of the key API endpoints that have been identified.

### WordPress REST API

The website exposes the standard WordPress REST API. For a complete reference of all available endpoints and their parameters, please refer to the [official WordPress REST API documentation](https://developer.wordpress.org/rest-api/).

#### Get Posts

*   **Endpoint:** `GET /wp/v2/posts`
*   **Description:** Retrieves a list of posts.
*   **cURL Example:**
    ```bash
    curl https://traeinfo.dk/wp-json/wp/v2/posts
    ```

#### Get Pages

*   **Endpoint:** `GET /wp/v2/pages`
*   **Description:** Retrieves a list of pages.
*   **cURL Example:**
    ```bash
    curl https://traeinfo.dk/wp-json/wp/v2/pages
    ```

### Custom Endpoints

The website also uses `admin-ajax.php` for some custom functionality.

#### AJAX Endpoint

*   **Endpoint:** `POST /wp-admin/admin-ajax.php`
*   **Description:** A general purpose AJAX endpoint for WordPress. The specific action is specified in the `action` parameter of the request body.
*   **cURL Example:**
    ```bash
    curl -X POST -d "action=mdf_search_panel" https://traeinfo.dk/wp-admin/admin-ajax.php
    ```

### WooCommerce

The website uses WooCommerce, and some of its functionality is exposed through the API.

#### Get Refreshed Fragments

*   **Endpoint:** `POST /?wc-ajax=get_refreshed_fragments`
*   **Description:** Retrieves updated cart information for WooCommerce.
*   **cURL Example:**
    ```bash
    curl -X POST https://traeinfo.dk/?wc-ajax=get_refreshed_fragments
    ```
