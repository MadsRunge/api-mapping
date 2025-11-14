# Workbook: traeinfo.dk API Discovery

This workbook documents the process of exploring and mapping the API of `httpsa://traeinfo.dk`.

## Initial Exploration

-   **Date:** 2025-11-14
-   **Tool:** Gemini CLI
-   **Objective:** Identify public API endpoints for `traeinfo.dk`.

I started by navigating to the website and observing the initial network traffic. The site is a WordPress site, and I immediately noticed calls to `wp-admin/admin-ajax.php` and `wp-json`.

## Interactive Discovery

### Search

I used the search functionality on the website to see if it would trigger any API calls. I searched for the term "test". This did not trigger any specific API calls for search results. Instead, it navigated to a new page with the search results rendered in the HTML: `https://traeinfo.dk/?s=test`.

### Login

I clicked the "LOGIN" button, which revealed a dropdown menu with login options. This did not trigger any API calls. It is likely that the login is a standard WordPress login form that is submitted to the server.

### WordPress REST API

I navigated to the standard WordPress REST API endpoint at `https://traeinfo.dk/wp-json/wp/v2`. This returned a JSON response with a list of all the available routes under the `/wp/v2` namespace. This confirmed that the website is using the WordPress REST API.

## Discovered Endpoints

Based on the exploration, the following key endpoints were identified:

-   `GET /wp-json/wp/v2/posts`: Retrieves a list of posts.
-   `GET /wp-json/wp/v2/pages`: Retrieves a list of pages.
-   `GET /wp-json/wp/v2/media`: Retrieves a list of media.
-   `POST /wp-admin/admin-ajax.php`: A general purpose AJAX endpoint for WordPress. The action is specified in the request body.
-   `POST /?wc-ajax=get_refreshed_fragments`: Retrieves updated cart information for WooCommerce.

## Conclusion

The `traeinfo.dk` website primarily uses the standard WordPress REST API. There are also some custom AJAX actions handled through `admin-ajax.php` and WooCommerce-specific AJAX calls. Due to the extensive nature of the WordPress REST API, the `openapi.yaml` file will focus on the most important endpoints and refer to the official WordPress documentation for a complete reference.
