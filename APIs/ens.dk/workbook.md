# Workbook: ens.dk API Discovery

This workbook documents the process of exploring and mapping the API of `https://ens.dk`.

## Initial Exploration

-   **Date:** 2025-11-14
-   **Tool:** Gemini CLI
-   **Objective:** Identify public API endpoints for `ens.dk`.

I started by navigating to the website and observing the initial network traffic. The site is a Drupal site.

## Interactive Discovery

### Search

I used the search functionality on the website to see if it would trigger any API calls. I searched for the term "test". This did not trigger any specific API calls for search results. Instead, it navigated to a new page with the search results rendered in the HTML: `https://ens.dk/search/node?keys=test`.

## Discovered Endpoints

Based on the exploration, the following key endpoints were identified:

-   `GET /sitewide_alert/load`: Retrieves a list of sitewide alerts.
-   `GET /search/node`: Performs a search on the website.

## Conclusion

The `ens.dk` website has a limited public API. The main functionality is handled by the Drupal CMS.
