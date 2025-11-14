# MEMBRAN-ERFA Web Scraping Guide

> **Building Construction Membrane Documentation Extractor**

This guide provides everything you need to programmatically extract construction detail documentation from [membran-erfa.dk](https://membran-erfa.dk).

## Overview

**Website**: https://membran-erfa.dk
**Content Type**: Building construction membrane installation details
**Total Items**: 94 construction details across 7 categories
**Language**: Danish (da)
**Technology**: Drupal CMS (server-rendered HTML)

### Important Note

⚠️ **This is NOT a REST API**. MEMBRAN-ERFA is a traditional Drupal-based website that serves HTML pages. This documentation provides structured guidance for web scraping and content extraction.

## What You Can Extract

### 1. Categories (7 total)
- Dampspærre (Vapor Barrier) - 26 items
- Fugtspærre (Moisture Barrier) - 17 items
- Geotekstil (Geotextile) - 5 items
- Radonspærre (Radon Barrier) - 14 items
- Undertag (Roofing Underlay) - 21 items
- Vindspærre (Wind Barrier) - 4 items
- Vådrumsmembran (Wet Room Membrane) - 7 items

### 2. Construction Details
Each construction detail includes:
- Title and description
- Category classification
- Reference to BYG-ERFA publications (when available)
- Step-by-step installation images with captions
- Technical notes and best practices

### 3. Images
- **Thumbnail sizes**: 270x159px (category page)
- **Medium**: 650x650px (homepage teasers)
- **Full resolution**: 2000px width (detail pages)
- **Format**: JPEG

## Quick Start

### Python Example

```python
import requests
from bs4 import BeautifulSoup

# Fetch homepage and extract categories
response = requests.get('https://membran-erfa.dk/')
soup = BeautifulSoup(response.content, 'html.parser')

# Extract category information
categories = []
for link in soup.select('main a[href*="/dampspaerre"], main a[href*="/fugtspaerre"]'):
    # Extract details from each category card
    pass
```

### JavaScript Example

```javascript
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeCategories() {
  const response = await axios.get('https://membran-erfa.dk/');
  const $ = cheerio.load(response.data);

  // Extract categories from homepage
  const categories = [];
  $('main a').each((i, elem) => {
    // Extract category information
  });

  return categories;
}
```

### Bash Example

```bash
# Download homepage
curl -s https://membran-erfa.dk/ > homepage.html

# Extract category links
grep -oP 'href="/[^"]+(?:dampspaerre|fugtspaerre|geotekstil)"' homepage.html

# Download a specific category page
curl -s https://membran-erfa.dk/dampspaerre > dampspaerre.html
```

See the `examples/` folder for complete working scripts.

## Content Structure

### Homepage
```
https://membran-erfa.dk/
├── Category: Dampspærre (26 items)
├── Category: Fugtspærre (17 items)
├── Category: Geotekstil (5 items)
├── Category: Radonspærre (14 items)
├── Category: Undertag (21 items)
├── Category: Vindspærre (4 items)
└── Category: Vådrumsmembran (7 items)
```

### Category Page
```
https://membran-erfa.dk/{category-slug}
├── Category title and description
├── Construction detail 1 (with thumbnail)
├── Construction detail 2 (with thumbnail)
├── ...
└── Link to publications
```

### Construction Detail Page
```
https://membran-erfa.dk/{detail-slug}
├── Title
├── Reference publication link
├── Image gallery (10-15 images)
│   ├── Step 1: Overview with annotations
│   ├── Step 2: First installation step
│   ├── Step 3: Second installation step
│   └── ...
└── Technical notes
```

## URL Patterns

### Category Pages
- Pattern: `https://membran-erfa.dk/{category-slug}`
- Examples:
  - `https://membran-erfa.dk/dampspaerre`
  - `https://membran-erfa.dk/fugtspaerre`
  - `https://membran-erfa.dk/radon`

### Construction Detail Pages
- Pattern: `https://membran-erfa.dk/{detail-slug}`
- Examples:
  - `https://membran-erfa.dk/bjaelkespaer-og-rem`
  - `https://membran-erfa.dk/vindue-let-ydervaeg`

### Images
- Pattern: `https://membran-erfa.dk/sites/default/files/styles/{size}/public/{path}`
- Size options:
  - `270x159` - Category page thumbnails
  - `max_650x650` - Homepage teasers
  - `2000` - Full resolution

## Recommended Scraping Workflow

### Step 1: Extract Categories
```
GET https://membran-erfa.dk/
↓
Parse: Category titles, URLs, item counts, thumbnails
↓
Result: List of 7 categories with metadata
```

### Step 2: Extract Construction Details per Category
```
For each category:
  GET https://membran-erfa.dk/{category-slug}
  ↓
  Parse: Construction detail titles, URLs, thumbnails
  ↓
  Result: List of construction details for this category
```

### Step 3: Extract Images from Detail Pages
```
For each construction detail:
  GET https://membran-erfa.dk/{detail-slug}
  ↓
  Parse: Image gallery URLs and captions
  ↓
  Result: List of installation step images
```

### Step 4: Download Images
```
For each image URL:
  GET https://membran-erfa.dk/sites/default/files/styles/2000/...
  ↓
  Save to disk
```

## CSS Selectors for Extraction

### Homepage
```css
/* Category cards */
main a[href*="/dampspaerre"],
main a[href*="/fugtspaerre"],
main a[href*="/geotekstil"],
main a[href*="/radon"],
main a[href*="/undertag"],
main a[href*="/vindspaerre"],
main a[href*="/vaadrumsmembran"]

/* Category images */
img[src*="max_650x650"]

/* Item counts */
/* Extract from text: "Se konstruktionsdetaljer (26)" */
```

### Category Page
```css
/* Page title */
h1

/* Construction detail links */
a[href^="/"][href$="/"]

/* Thumbnails */
img[src*="270x159"]

/* Publications link */
a[href*="/publikationer-"]
```

### Detail Page
```css
/* Page title */
h1

/* Reference publication */
a[href*="byg-erfa.dk"]

/* Gallery images (full resolution) */
a[href*="/styles/2000/"] img

/* Image captions */
/* Extract from img alt attribute or link text */
```

## Best Practices

### Rate Limiting
- **Recommended delay**: 1-2 seconds between requests
- **Be polite**: This is a small educational website
- **User-Agent**: Identify your scraper clearly
  ```
  User-Agent: MEMBRAN-ERFA-Scraper/1.0 (Contact: your-email@example.com)
  ```

### Respect robots.txt
```bash
# Check allowed paths
curl https://membran-erfa.dk/robots.txt
```

### Caching
- Cache HTML pages locally to avoid repeated requests
- Only re-scrape when content updates are expected
- Store extracted data in a database

### Error Handling
- Handle 404 errors gracefully (pages may be removed)
- Implement retry logic with exponential backoff
- Log all errors for debugging

### Data Storage
Recommended structure:
```
data/
├── categories.json          # Category metadata
├── construction_details.json # All construction details
└── images/
    ├── dampspaerre/
    │   ├── bjaelkespaer-og-rem/
    │   │   ├── step-01.jpg
    │   │   ├── step-02.jpg
    │   │   └── ...
    │   └── ...
    └── ...
```

## Common Use Cases

### 1. Build a Local Archive
Extract all construction details and images for offline reference.

```bash
# See examples/download_all.sh
```

### 2. Create a Search Index
Index all construction details for full-text search.

```python
# See examples/build_search_index.py
```

### 3. Generate PDF Documentation
Convert web content to PDF documents for printing.

```javascript
// See examples/generate_pdfs.js
```

### 4. Translation Pipeline
Extract Danish content for translation to other languages.

```python
# See examples/extract_for_translation.py
```

## Data Schema

### Category Object
```json
{
  "slug": "dampspaerre",
  "title": "Dampspærre",
  "description": "En dampspærre hindrer...",
  "construction_count": 26,
  "thumbnail_url": "/sites/default/files/styles/max_650x650/public/images/2022-06/dampspaerre_0.jpg",
  "page_url": "https://membran-erfa.dk/dampspaerre"
}
```

### Construction Detail Object
```json
{
  "slug": "bjaelkespaer-og-rem",
  "title": "Bjælkespær og rem",
  "category": "dampspaerre",
  "reference_publication": {
    "code": "BYG-ERFA (39) 24 01 10",
    "url": "https://byg-erfa.dk/dampspaerrer-monteringsdetaljer-0",
    "title": "Dampspærrer – monteringsdetaljer"
  },
  "installation_steps": [
    {
      "step_number": 1,
      "description": "Illustration med alle tegningspåskrifter",
      "image_url": "https://membran-erfa.dk/sites/default/files/styles/2000/public/gallery/2022-02/bjaelkespaer_scene-14.jpg"
    },
    {
      "step_number": 2,
      "description": "Limtræsrem",
      "image_url": "https://membran-erfa.dk/sites/default/files/styles/2000/public/gallery/2022-02/bjaelkespaer_scene-1.jpg"
    }
  ],
  "page_url": "https://membran-erfa.dk/bjaelkespaer-og-rem"
}
```

## Troubleshooting

### Issue: Images not loading
**Solution**: Check if you're using the correct image style size in the URL. Try `2000` for full resolution.

### Issue: HTML parsing errors
**Solution**: Ensure you're handling Danish characters correctly (UTF-8 encoding).

### Issue: Rate limited
**Solution**: Increase delay between requests. The site doesn't have aggressive rate limiting, but be respectful.

### Issue: Changed HTML structure
**Solution**: The site is built on Drupal. Check `workbook.md` for detailed HTML structure analysis.

## Legal & Ethical Considerations

### Copyright
- All content is © Fonden BYG-ERFA
- See: https://membran-erfa.dk/ophavsret
- **Respect copyright**: Don't republish content without permission

### Attribution
When using scraped data:
```
Source: MEMBRAN-ERFA (https://membran-erfa.dk)
© Fonden BYG-ERFA
```

### Responsible Scraping
- Don't overload the server
- Use caching to minimize requests
- Identify your scraper in User-Agent
- Contact the organization for bulk access if needed:
  - Email: info@byg-erfa.dk
  - Phone: +45 82 30 30 22

## Additional Resources

- **Site Map**: See `scraping-spec.yaml` for complete endpoint documentation
- **Code Examples**: See `examples/` directory for working scripts
- **Technical Details**: See `workbook.md` for deep-dive analysis
- **Organization**: https://byg-erfa.dk/

## Support & Questions

For questions about this documentation:
- Open an issue in this repository

For questions about the website content:
- Contact: Fonden BYG-ERFA
- Email: info@byg-erfa.dk
- Website: https://membran-erfa.dk/membran-erfa

## Tools & Libraries

### Python
- `requests` - HTTP client
- `beautifulsoup4` - HTML parsing
- `scrapy` - Full scraping framework
- `lxml` - Fast XML/HTML processing

### JavaScript
- `axios` - HTTP client
- `cheerio` - HTML parsing
- `puppeteer` - Headless browser (if needed)

### Bash
- `curl` - HTTP client
- `wget` - File downloader
- `pup` - HTML parsing
- `jq` - JSON processing

### Generic
- `robots.txt` parser - Respect crawl rules
- Database (SQLite, PostgreSQL) - Store extracted data
- Image optimizer - Compress downloaded images

## Version History

- **v1.0.0** (2024-11-14): Initial release
  - Complete site structure documentation
  - All 7 categories mapped
  - 94 construction details identified
  - Example scripts provided

## License

This documentation is provided as-is for educational purposes. The actual website content is © Fonden BYG-ERFA.
