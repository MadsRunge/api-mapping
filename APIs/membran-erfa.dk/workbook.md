# MEMBRAN-ERFA Technical Workbook

**Date**: November 14, 2024
**Site**: https://membran-erfa.dk
**Analysis Tool**: Chrome DevTools MCP Server

## Executive Summary

MEMBRAN-ERFA is a Drupal-based educational website providing technical construction documentation for building membrane installations. The site contains **94 construction details** across **7 categories**, with step-by-step installation diagrams.

**Key Finding**: This is NOT a REST API - it's a traditional server-rendered website requiring web scraping for data extraction.

## Discovery Methodology

### Phase 1: Initial Reconnaissance
1. Navigated to homepage: `https://membran-erfa.dk/`
2. Captured network traffic during page load
3. Analyzed HTTP requests and responses
4. Identified technology stack

### Phase 2: Site Structure Analysis
1. Explored homepage structure
2. Clicked through category pages
3. Examined construction detail pages
4. Analyzed image delivery system

### Phase 3: Content Mapping
1. Catalogued all 7 membrane categories
2. Counted construction details per category
3. Documented URL patterns
4. Mapped image resolutions and paths

## Technology Stack

### Backend
- **CMS**: Drupal (identified from URL patterns and HTML structure)
- **Language**: PHP (standard for Drupal)
- **Server**: Not explicitly identified (likely Apache or Nginx)

### Frontend
- **HTML5**: Standard semantic markup
- **CSS**: Multiple stylesheets with Drupal aggregation
  - File pattern: `/sites/default/files/css/css_*.css`
  - Query parameters include: `delta`, `language=da`, `theme=bygerfa_make`
- **JavaScript**: Minimal client-side interaction
  - File pattern: `/sites/default/files/js/js_*.js`
  - Includes: `switch_mode.js` for view switching

### Third-Party Services
1. **Cookiebot** (consent.cookiebot.com)
   - GDPR cookie consent management
   - UUID: `f284e47a-4acc-46ff-b247-fe46511987c9`

2. **Piwik PRO** (membran-erfa.containers.piwik.pro)
   - Web analytics platform
   - Container ID: `c783f6b7-f366-447b-ac0f-7f9d4fa4a4e3`
   - Endpoint: `https://membran-erfa.piwik.pro/ppms.php`

3. **MyFonts** (hello.myfonts.net)
   - Web font tracking
   - Fonts served from `/themes/custom/bygerfa_make/fonts/`

### Image Processing
- **Drupal Image Styles**: Automatic image resizing
- **Available sizes**:
  - `270x159` - Category page thumbnails
  - `max_325x325` - Small logo images
  - `max_650x650` - Homepage category teasers
  - `2000` - Full resolution detail images
- **Format**: JPEG
- **Path pattern**: `/sites/default/files/styles/{size}/public/{path}`

## Network Traffic Analysis

### Initial Page Load (36 requests)
```
GET  https://membran-erfa.dk/                                 [200 OK]
GET  /sites/default/files/css/*.css                           [200 OK] (3 files)
GET  /sites/default/files/js/*.js                             [200 OK] (3 files)
GET  /sites/default/files/styles/max_650x650/public/*.jpg     [200 OK] (7 images)
GET  /themes/custom/bygerfa_make/fonts/*.woff2                [200 OK] (4 fonts)
GET  consent.cookiebot.com/uc.js                              [200 OK]
GET  membran-erfa.containers.piwik.pro/*.js                   [200 OK]
POST membran-erfa.piwik.pro/ppms.php                          [202 Accepted] (2 requests)
```

### Category Page Load (~50 requests)
```
GET  https://membran-erfa.dk/dampspaerre                      [200 OK]
GET  /sites/default/files/styles/270x159/public/*.jpg         [200 OK] (26 thumbnails)
GET  (CSS, JS, fonts cached from homepage)
POST membran-erfa.piwik.pro/ppms.php                          [202 Accepted]
```

### Construction Detail Page (~50 requests)
```
GET  https://membran-erfa.dk/bjaelkespaer-og-rem             [200 OK]
GET  /sites/default/files/styles/2000/public/gallery/*.jpg    [200 OK] (13 images)
GET  (CSS, JS, fonts cached)
POST membran-erfa.piwik.pro/ppms.php                          [202 Accepted]
```

### No API Endpoints Found
- **Zero JSON responses**: All content served as HTML
- **Zero REST endpoints**: No `/api/` paths detected
- **Zero GraphQL**: No `/graphql` endpoint
- **Zero WebSocket**: No real-time connections
- **Zero AJAX**: Page navigation is full page reloads

## Content Structure

### Homepage (`/`)

#### HTML Structure
```html
<main>
  <h1>Bygningers tæthed</h1>
  <p>Her finder du udførelsesforløb for 94 bygningsdetaljer...</p>

  <!-- Category Cards (7 total) -->
  <a href="/dampspaerre">
    <img src="/sites/default/files/styles/max_650x650/public/images/2022-06/dampspaerre_0.jpg">
    <h3>Dampspærre</h3>
    <p>En dampspærre hindrer, at vanddamp i indeluft trænger ud i bygningskonstruktionen</p>
    <span>Se konstruktionsdetaljer (26)</span>
  </a>

  <a href="/fugtspaerre">...</a>
  <a href="/geotekstil">...</a>
  <a href="/radon">...</a>
  <a href="/undertag">...</a>
  <a href="/vindspaerre">...</a>
  <a href="/vaadrumsmembran">...</a>
</main>
```

#### Accessibility Tree
```
RootWebArea "Bygningers tæthed | MEMBRAN-ERFA"
├── banner
│   └── link "Home" (logo)
├── main
│   ├── heading level=1 "Bygningers tæthed"
│   ├── StaticText (description)
│   ├── link "Dampspærre" (multiple elements)
│   │   ├── image "Dampspærre"
│   │   ├── StaticText "Dampspærre"
│   │   └── StaticText "Se konstruktionsdetaljer (26)"
│   └── (6 more category sections)
└── contentinfo
    └── (footer links and contact info)
```

### Category Page (`/dampspaerre`)

#### HTML Structure
```html
<main>
  <a href="/">← Tilbage til forsiden</a>

  <h1>Dampspærre</h1>
  <p>En dampspærre er et materialelag, der hindrer...</p>

  <h3>26 konstruktioner</h3>
  <span>Gallerivisning</span>
  <span>Listevisning</span>

  <!-- Construction Detail Cards (26 for this category) -->
  <a href="/bjaelkespaer-og-rem">
    <img src="/sites/default/files/styles/270x159/public/teaser-images/2022-06/scene-13.jpg">
    <h4>Bjælkespær og rem</h4>
    <span>Se konstruktion</span>
  </a>

  <a href="/dampspaerre-traeskelethuse">...</a>
  <!-- ... 24 more items ... -->

  <!-- Additional Information -->
  <h2>Her skal du være særligt opmærksom på udførelsen</h2>
  <p>Konstruktionsdetaljerne skal udføres lufttætte...</p>

  <h2>En dampspærremembran med lufttætte samlinger hindrer</h2>
  <ul>...</ul>
</main>
```

#### Observed Elements
- Back to homepage link
- Category title and description
- View mode toggle (Gallery/List)
- Construction detail grid (responsive)
- Educational content sections
- Link to publications page

### Construction Detail Page (`/bjaelkespaer-og-rem`)

#### HTML Structure
```html
<main>
  <a href="/">← Tilbage til forsiden</a>

  <h1>Bjælkespær og rem</h1>

  <p>Se også
    <a href="https://byg-erfa.dk/dampspaerrer-monteringsdetaljer-0">
      BYG-ERFA (39) 24 01 10
    </a>
    Dampspærrer – monteringsdetaljer
  </p>

  <!-- Image Gallery -->
  <a href="/sites/default/files/styles/2000/public/gallery/2022-02/bjaelkespaer_scene-14.jpg">
    <img src="/sites/default/files/styles/2000/public/gallery/2022-02/bjaelkespaer_scene-14.jpg"
         alt="Illustration med alle tegningspåskrifter">
  </a>

  <a href="/sites/default/files/styles/2000/public/gallery/2022-02/bjaelkespaer_scene-1.jpg">
    <img src="..." alt="Limtræsrem">
  </a>

  <!-- ... 11 more images ... -->
</main>
```

#### Image Gallery Characteristics
- **Images per page**: 10-15 on average
- **First image**: Usually an overview with all annotations
- **Subsequent images**: Step-by-step installation process
- **Captions**: Stored in `alt` attribute
- **Resolution**: 2000px width (high quality)
- **File naming**: `{detail-name}_scene-{number}.jpg`
- **Storage path**: `/sites/default/files/styles/2000/public/gallery/{year-month}/`

## URL Patterns & Structure

### Pattern Analysis

#### Homepage
```
https://membran-erfa.dk/
```

#### Category Pages
```
Pattern: /{category-slug}
Examples:
  /dampspaerre       (Vapor Barrier)
  /fugtspaerre       (Moisture Barrier)
  /geotekstil        (Geotextile)
  /radon            (Radon Barrier)
  /undertag          (Roofing Underlay)
  /vindspaerre       (Wind Barrier)
  /vaadrumsmembran   (Wet Room Membrane)
```

#### Construction Detail Pages
```
Pattern: /{detail-slug}
Examples:
  /bjaelkespaer-og-rem
  /dampspaerre-traeskelethuse
  /vindue-let-ydervaeg
  /el-udtag-og-foering-af-kabler-let-ydervaeg

Naming convention:
  - Lowercase
  - Danish characters (æ, ø, å) → (ae, oe, aa)
  - Spaces → hyphens
  - Descriptive of construction detail
```

#### Publications Pages
```
Pattern: /publikationer-{category}
Examples:
  /publikationer-dampspaerre
  /publikationer-fugtspaerre
```

#### Image URLs
```
Pattern: /sites/default/files/styles/{size}/public/{type}/{date}/{filename}.jpg

Components:
  - size: 270x159 | max_325x325 | max_650x650 | 2000
  - type: images | teaser-images | gallery | organisationer
  - date: YYYY-MM format (e.g., 2022-06, 2023-10)
  - filename: descriptive name with scene numbers

Examples:
  /sites/default/files/styles/max_650x650/public/images/2022-06/dampspaerre_0.jpg
  /sites/default/files/styles/270x159/public/teaser-images/2022-06/scene-13.jpg
  /sites/default/files/styles/2000/public/gallery/2022-02/bjaelkespaer_scene-1.jpg
```

## Complete Content Catalog

### Category 1: Dampspærre (Vapor Barrier)
- **Items**: 26
- **URL**: `/dampspaerre`
- **Description**: Hindrer vanddamp i indeluft trænger ud i bygningskonstruktionen

**Sample Construction Details**:
1. Bjælkespær og rem
2. Dampspærre i træskelethuse
3. Efterisolering af loft – dampspærre monteret nedefra
4. Efterisolering af loft – dampspærre monteret nedefra ved gavl
5. Efterisolering af loft – dampspærre monteret oppefra
6. Efterisolering af loft med lasker på spær
7. El-udtag og føring af kabler i let ydervæg
8. Hæftning af membran mod underlag
9. Indadgående hjørne
10. Indbygning af safeboks i loft
11. Indervæg og let loft – tilslutning mod væg
12. Indervæg og loft – tilslutning mod rem
13. Kabler og rør i tung konstruktionsdel
14. Let ydervæg og terrændæk
15. Let ydervæg og terrændæk med klinker
16. Let ydervæg og tungt loft
17. Loftlem i et let loft
18. Ovenlys i skråvæg med krydsfiner
19. Skråvæg og hanebånd
20. Skunkvæg/bjælkelag og underliggende loft (varm skunk)
21. Stålskorsten i loftkonstruktion
22. Tilslutning til gavl
23. Tung bagmur og let loft
24. Udadgående hjørne
25. Ventilationskanal i loftkonstruktion
26. Vindue i let ydervæg

### Category 2: Fugtspærre (Moisture Barrier)
- **Items**: 17
- **URL**: `/fugtspaerre`
- **Description**: Hindrer fugttransport i væskeform

### Category 3: Geotekstil (Geotextile)
- **Items**: 5
- **URL**: `/geotekstil`
- **Description**: Hindrer vandring af jordpartikler fx ind i en drænledning

### Category 4: Radonspærre (Radon Barrier)
- **Items**: 14
- **URL**: `/radon`
- **Description**: Hindrer indtrængning af radon i bygninger

### Category 5: Undertag (Roofing Underlay)
- **Items**: 21
- **URL**: `/undertag`
- **Description**: Bortleder regnvand og fygesne, som er trængt gennem tagdækningen

### Category 6: Vindspærre (Wind Barrier)
- **Items**: 4
- **URL**: `/vindspaerre`
- **Description**: Hindrer, at kold udeluft blæser gennem varmeisoleringen

### Category 7: Vådrumsmembran (Wet Room Membrane)
- **Items**: 7
- **URL**: `/vaadrumsmembran`
- **Description**: Et vandtæt lag i en vådrumskonstruktion

**Total**: 26 + 17 + 5 + 14 + 21 + 4 + 7 = **94 construction details**

## HTML Parsing Strategies

### Strategy 1: Homepage Category Extraction

```python
from bs4 import BeautifulSoup

def extract_categories(html):
    soup = BeautifulSoup(html, 'html.parser')
    main = soup.find('main')

    categories = []

    # Find all category links
    for link in main.find_all('a', href=True):
        href = link['href']

        # Filter for category pages
        if href in ['/dampspaerre', '/fugtspaerre', '/geotekstil',
                    '/radon', '/undertag', '/vindspaerre', '/vaadrumsmembran']:

            # Extract image
            img = link.find('img')
            img_url = img['src'] if img else None

            # Extract title (usually in a heading or strong text)
            title = link.get_text(strip=True)

            # Extract item count from "Se konstruktionsdetaljer (26)"
            count_text = link.find(string=lambda t: 'konstruktionsdetaljer' in t if t else False)
            count = extract_number(count_text) if count_text else 0

            categories.append({
                'url': href,
                'title': title,
                'image_url': img_url,
                'item_count': count
            })

    return categories
```

### Strategy 2: Category Page Construction Detail Extraction

```python
def extract_construction_details(html, category_url):
    soup = BeautifulSoup(html, 'html.parser')
    main = soup.find('main')

    details = []

    # Find the category title
    title = main.find('h1').get_text(strip=True)

    # Find all construction detail links (exclude header/footer links)
    for link in main.find_all('a', href=True):
        href = link['href']

        # Filter for detail pages (starts with /, not absolute URLs)
        if href.startswith('/') and href not in ['/', category_url]:
            if 'byg-erfa.dk' not in href and 'publikationer' not in href:

                # Extract thumbnail
                img = link.find('img')
                thumbnail_url = img['src'] if img else None

                # Extract title
                detail_title = link.get_text(strip=True)

                details.append({
                    'url': href,
                    'title': detail_title,
                    'thumbnail_url': thumbnail_url,
                    'category': title
                })

    return details
```

### Strategy 3: Detail Page Image Gallery Extraction

```python
def extract_image_gallery(html):
    soup = BeautifulSoup(html, 'html.parser')
    main = soup.find('main')

    images = []

    # Find title
    title = main.find('h1').get_text(strip=True)

    # Find reference publication
    ref_link = main.find('a', href=lambda h: h and 'byg-erfa.dk' in h)
    reference = {
        'url': ref_link['href'],
        'text': ref_link.get_text(strip=True)
    } if ref_link else None

    # Find all gallery images (high resolution)
    for link in main.find_all('a', href=lambda h: h and '/styles/2000/' in h):
        img = link.find('img')

        if img:
            images.append({
                'url': link['href'],
                'caption': img.get('alt', ''),
                'order': len(images) + 1
            })

    return {
        'title': title,
        'reference': reference,
        'images': images
    }
```

## CSS Selectors Reference

### Homepage
```css
/* Main container */
main

/* Category cards */
main > a[href^="/"]

/* Category images */
main a img[src*="max_650x650"]

/* Category titles */
main a > *:not(img)  /* Extract text content */

/* Item counts */
/* Use regex on text: /konstruktionsdetaljer \((\d+)\)/ */
```

### Category Page
```css
/* Page title */
main h1

/* Description */
main > p:first-of-type

/* Item count header */
main h3

/* Construction detail cards */
main a[href^="/"]:not([href="/"]):not([href*="publikationer"])

/* Construction detail thumbnails */
main a img[src*="270x159"]

/* Publications link */
main a[href*="/publikationer-"]
```

### Construction Detail Page
```css
/* Page title */
main h1

/* Reference publication link */
main a[href*="byg-erfa.dk"]

/* Gallery images (full resolution) */
main a[href*="/styles/2000/"] img

/* Image captions */
main a[href*="/styles/2000/"] img[alt]
```

## Scraping Challenges & Solutions

### Challenge 1: Danish Characters
**Issue**: URLs contain Danish characters (æ, ø, å) converted to slugs (ae, oe, aa)

**Solution**:
```python
def danish_to_slug(text):
    text = text.lower()
    text = text.replace('æ', 'ae')
    text = text.replace('ø', 'oe')
    text = text.replace('å', 'aa')
    text = text.replace(' ', '-')
    return text
```

### Challenge 2: Image URL Construction
**Issue**: Multiple image sizes available, need to construct URL for desired size

**Solution**:
```python
def get_image_url(original_url, size='2000'):
    # Original: /sites/default/files/styles/270x159/public/gallery/...
    # Replace size: /sites/default/files/styles/2000/public/gallery/...
    return original_url.replace('/styles/270x159/', f'/styles/{size}/')
```

### Challenge 3: Extracting Item Counts
**Issue**: Item counts are embedded in link text: "Se konstruktionsdetaljer (26)"

**Solution**:
```python
import re

def extract_item_count(text):
    match = re.search(r'konstruktionsdetaljer \((\d+)\)', text)
    return int(match.group(1)) if match else 0
```

### Challenge 4: Distinguishing Detail Pages from Other Links
**Issue**: Many links on page, need to filter for construction detail pages

**Solution**:
```python
def is_construction_detail_link(href):
    if not href or not href.startswith('/'):
        return False

    # Exclude known non-detail pages
    excluded = ['/', '/publikationer-', 'mailto:', 'byg-erfa.dk',
                '/membran-erfa', '/ansvarsfraskrivelse', '/ophavsret',
                '/persondatapolitik']

    return not any(ex in href for ex in excluded)
```

## Performance Considerations

### Request Timing
Based on observed network traffic:
- **Homepage**: ~1.5s total load time
- **Category page**: ~2s total load time
- **Detail page**: ~2.5s total load time

### Recommended Scraping Strategy
```
Total requests for complete scrape:
  1 homepage request
  + 7 category page requests
  + 94 construction detail page requests
  + ~1,000 image requests (estimated)
  = ~1,102 requests total

Estimated time with 1s delay:
  1,102 requests × 1s = ~18 minutes

Estimated time with 2s delay:
  1,102 requests × 2s = ~37 minutes
```

## Data Quality & Validation

### Validation Checks

1. **Category count verification**:
   ```python
   assert len(categories) == 7, "Expected 7 categories"
   ```

2. **Total items verification**:
   ```python
   total_items = sum(cat['item_count'] for cat in categories)
   assert total_items == 94, f"Expected 94 items, found {total_items}"
   ```

3. **Image URL validation**:
   ```python
   def validate_image_url(url):
       return url.startswith('/sites/default/files/styles/')
   ```

4. **Slug format validation**:
   ```python
   import re

   def validate_slug(slug):
       return bool(re.match(r'^[a-z0-9-]+$', slug))
   ```

## Contact Information

**Organization**: Fonden BYG-ERFA
**Website**: https://membran-erfa.dk
**Email**: info@byg-erfa.dk
**Phone**: +45 82 30 30 22
**Address**: Ny Kongensgade 13, 1472 København K, Denmark
**CVR**: 27055761

**Parent Organization**: BYG-ERFA
**Main Site**: https://byg-erfa.dk

## Conclusion

MEMBRAN-ERFA is a well-structured educational resource that can be effectively scraped for content extraction. The site's Drupal foundation provides consistent HTML patterns, making it relatively straightforward to parse.

**Key Takeaways**:
- 94 construction details across 7 categories
- High-quality images (2000px width)
- Consistent URL and HTML structure
- No API available - web scraping required
- Respectful scraping is essential for this educational resource

**Documentation Version**: 1.0.0
**Last Updated**: November 14, 2024
