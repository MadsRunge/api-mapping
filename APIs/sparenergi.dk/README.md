# SparEnergi.dk API Documentation

This documentation provides an overview of the APIs used by the [SparEnergi.dk](https://sparenergi.dk) website to find and display energy label information for buildings in Denmark.

## API Overview

The SparEnergi.dk service uses a combination of a primary API for address lookups and statistics, and a secondary service for retrieving detailed energy label data, including building images and PDF reports.

-   **Main API**: `https://sparenergi.dk`
-   **Energy Label Data API**: `https://emoweb.dk`

There is no authentication required to access these APIs.

## Endpoints

### 1. Address Autocomplete

Provides a list of address suggestions based on a search query.

-   **Endpoint**: `GET /address/autocomplete`
-   **Example**: `https://sparenergi.dk/address/autocomplete?q=Rådhuspladsen%201`

**Query Parameters:**

-   `q` (string, required): The address to search for.

**Response:**

A JSON array of address suggestions.

```json
[
    {
        "value": "Rådhuspladsen 1, 9300 Sæby",
        "label": "Rådhuspladsen 1, 9300 Sæby"
    }
]
```

### 2. Get Building Image

Retrieves the image of the building associated with an energy label.

-   **Endpoint**: `GET https://emoweb.dk/EMODigital/EMODigital.svc/Picture/{EnergyLabelSerialIdentifier}`
-   **Example**: `https://emoweb.dk/EMODigital/EMODigital.svc/Picture/311243218`

**Path Parameters:**

-   `EnergyLabelSerialIdentifier` (string, required): The serial identifier of the energy label.

**Response:**

The building image in JPEG format.

### 3. Get PDF Report

Retrieves the full energy label report as a PDF.

-   **Endpoint**: `GET https://emoweb.dk/getcompcon/api/Data/GetPDFToBrowser`
-   **Example**: `https://emoweb.dk/getcompcon/api/Data/GetPDFToBrowser?EnergyLabelSerialIdentifier=311243218`

**Query Parameters:**

-   `EnergyLabelSerialIdentifier` (string, required): The serial identifier of the energy label.

**Response:**

The energy label report in PDF format.

### 4. Get Statistics

Retrieves statistical data for energy labels based on specified filters. This is a Drupal AJAX endpoint and is more complex to call directly.

-   **Endpoint**: `POST /energimærke/nuvaerende-energimaerke-b?ajax_form=1&_wrapper_format=drupal_ajax`

**Request Body:**

The request body must be `application/x-www-form-urlencoded` and contain various form parameters, including filters for house type, heating type, year of construction, and municipality.

**Response:**

A JSON response containing Drupal AJAX commands to update the page with new chart data and HTML.
