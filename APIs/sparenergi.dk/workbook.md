# API Discovery Workbook: SparEnergi.dk

This workbook details the process of discovering and mapping the APIs used by [SparEnergi.dk](https://sparenergi.dk) for its energy label search functionality.

## 1. Initial Exploration

-   **Date**: 2025-11-17
-   **Tool**: Gemini CLI with Chrome DevTools MCP

### Process

1.  Navigated to the website: `https://sparenergi.dk/energim%C3%A6rke/find-boligens-energimaerke`.
2.  Captured the initial network traffic on page load.
3.  Observed that no core API calls were made initially. The data is loaded dynamically based on user interaction.

## 2. Interactive Discovery

### Address Search

1.  **Action**: Entered "Rådhuspladsen 1" into the address search box.
2.  **Network Request Captured**:
    -   **Method**: `GET`
    -   **URL**: `https://sparenergi.dk/address/autocomplete?q=R%C3%A5dhuspladsen%201`
    -   **Response**: A JSON array of address suggestions.

    ```json
    [
        {"value":"R\u00e5dhuspladsen 12, 1. 1, 8362 H\u00f8rning","label":"R\u00e5dhuspladsen 12, 1. 1, 8362 H\u00f8rning"},
        {"value":"R\u00e5dhuspladsen 16, 1. 1, 8362 H\u00f8rning","label":"R\u00e5dhuspladsen 16, 1. 1, 8362 H\u00f8rning"},
        ...
    ]
    ```

3.  **Action**: Clicked on the suggestion "Rådhuspladsen 1, 9300 Sæby".
4.  **Result**: The page navigated to `https://sparenergi.dk/energim%C3%A6rke/nuvaerende-energimaerke-b` and displayed the energy label details.

### Energy Label Details

On the energy label details page, the following resources were loaded:

1.  **Building Image**:
    -   **Method**: `GET`
    -   **URL**: `https://emoweb.dk/EMODigital/EMODigital.svc/Picture/311243218`
    -   **Note**: The number `311243218` was identified as the `EnergyLabelSerialIdentifier`.

2.  **PDF Report Link**:
    -   A link on the page pointed to the following URL for downloading the full report:
    -   **URL**: `https://emoweb.dk/getcompcon/api/Data/GetPDFToBrowser?EnergyLabelSerialIdentifier=311243218`

### Statistics Chart

1.  **Action**: Clicked the "Vis data for kommune" (Show data for municipality) button.
2.  **Network Request Captured**:
    -   **Method**: `POST`
    -   **URL**: `https://sparenergi.dk/energim%C3%A6rke/nuvaerende-energimaerke-b?ajax_form=1&_wrapper_format=drupal_ajax`
    -   **Request Body**: `application/x-www-form-urlencoded` data containing form values and Drupal AJAX parameters.
    -   **Response**: A JSON object with Drupal AJAX commands to update the page, including the data for the statistics chart and a new dropdown for selecting a municipality.

## 3. API Analysis

### Endpoints Identified

1.  **Address Autocomplete**: `GET /address/autocomplete?q={address}`
    -   This is a simple RESTful endpoint for address suggestions.
2.  **Get Building Image**: `GET https://emoweb.dk/EMODigital/EMODigital.svc/Picture/{EnergyLabelSerialIdentifier}`
    -   Retrieves the building image.
3.  **Get PDF Report**: `GET https://emoweb.dk/getcompcon/api/Data/GetPDFToBrowser?EnergyLabelSerialIdentifier={EnergyLabelSerialIdentifier}`
    -   Retrieves the full energy label report.
4.  **Get Statistics**: `POST /energimærke/nuvaerende-energimaerke-b?ajax_form=1&_wrapper_format=drupal_ajax`
    -   A Drupal-specific AJAX endpoint for updating the statistics chart. Replicating this call would require managing the `form_build_id` and other Drupal-specific parameters.

### Authentication

No authentication is required for any of the discovered endpoints.

### Architecture Insights

-   The frontend is built with Drupal, which heavily influences how data is fetched and updated on the page.
-   The core energy label data (images, PDFs) is hosted on a separate domain, `emoweb.dk`, suggesting a microservices or service-oriented architecture.
-   The statistics functionality is tightly coupled with the Drupal backend, using AJAX forms for dynamic updates.
