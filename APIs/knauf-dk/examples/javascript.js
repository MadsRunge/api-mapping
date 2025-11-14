/**
 * Knauf Denmark Download Center API - JavaScript/Node.js Examples
 *
 * Requirements:
 * - Node.js 14+ or modern browser
 * - fetch API (built-in in Node.js 18+, use node-fetch for older versions)
 */

// Configuration
const ALGOLIA_APP_ID = 'S8QHLX2FWA';
const ALGOLIA_API_KEY = 'b3a868e70bb30b11a4b7e385c765ba91';
const ALGOLIA_BASE_URL = 'https://s8qhlx2fwa-dsn.algolia.net/1';
const DOWNLOAD_BASE_URL = 'https://knauf.com/api/download-center/v1';
const INDEX_NAME = 'prod_download_center_dk';

/**
 * Search documents in the Knauf download center
 *
 * @param {string} query - Search query string
 * @param {number} page - Page number (0-indexed)
 * @param {Object} filters - Filter options
 * @returns {Promise<Object>} Search results
 */
async function searchDocuments(query = '', page = 0, filters = {}) {
  const facetFilters = buildFacetFilters(filters);

  const params = new URLSearchParams({
    query,
    page: page.toString(),
    hitsPerPage: '20',
    facetFilters: JSON.stringify(facetFilters),
    facets: JSON.stringify([
      'documentTypes',
      'language',
      'division',
      'productCategories.lvl0.da',
      'areasOfApplication.da',
      'fieldsOfApplication.da'
    ]),
    maxValuesPerFacet: '50',
    highlightPreTag: '__ais-highlight__',
    highlightPostTag: '__/ais-highlight__',
  });

  const requestBody = {
    requests: [{
      indexName: INDEX_NAME,
      params: params.toString()
    }]
  };

  const response = await fetch(`${ALGOLIA_BASE_URL}/indexes/*/queries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-algolia-api-key': ALGOLIA_API_KEY,
      'x-algolia-application-id': ALGOLIA_APP_ID,
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.results[0]; // Return first result set
}

/**
 * Build facet filters from filter object
 *
 * @param {Object} filters - Filter options
 * @returns {Array} Facet filters array
 */
function buildFacetFilters(filters) {
  const facetFilters = [];

  // Language filter (OR within category)
  if (filters.languages && filters.languages.length > 0) {
    facetFilters.push(filters.languages.map(lang => `language:${lang}`));
  } else {
    // Default languages
    facetFilters.push(['language:da', 'language:en', 'language:de', 'language:sv']);
  }

  // Document type filter (OR within category)
  if (filters.documentTypes && filters.documentTypes.length > 0) {
    facetFilters.push(filters.documentTypes.map(type => `documentTypes:${type}`));
  }

  // Division filter
  if (filters.division) {
    facetFilters.push([`division:${filters.division}`]);
  }

  // Product category filter
  if (filters.productCategory) {
    facetFilters.push([`productCategories.lvl0.da:${filters.productCategory}`]);
  }

  return facetFilters;
}

/**
 * Download a document by asset ID
 *
 * @param {string} assetId - Document asset ID
 * @param {string} country - Country code (default: 'dk')
 * @param {string} locale - Locale code (default: 'da-DK')
 * @returns {Promise<Blob>} Document file as Blob
 */
async function downloadDocument(assetId, country = 'dk', locale = 'da-DK') {
  const url = `${DOWNLOAD_BASE_URL}/assets/${assetId}?download=true&country=${country}&locale=${locale}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`);
  }

  return await response.blob();
}

/**
 * Get document download URL
 *
 * @param {string} assetId - Document asset ID
 * @param {string} country - Country code (default: 'dk')
 * @param {string} locale - Locale code (default: 'da-DK')
 * @returns {string} Download URL
 */
function getDownloadUrl(assetId, country = 'dk', locale = 'da-DK') {
  return `${DOWNLOAD_BASE_URL}/assets/${assetId}?download=true&country=${country}&locale=${locale}`;
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Example 1: Basic search
 */
async function example1_BasicSearch() {
  console.log('Example 1: Basic search for "Ultra Board"');

  const results = await searchDocuments('Ultra Board');

  console.log(`Found ${results.nbHits} documents`);
  console.log(`Showing ${results.hits.length} results on page ${results.page + 1} of ${results.nbPages}`);

  results.hits.forEach((doc, index) => {
    console.log(`\n${index + 1}. ${doc.name}`);
    console.log(`   Asset ID: ${doc.assetId}`);
    console.log(`   Type: ${doc.documentTypes.join(', ')}`);
    console.log(`   Format: ${doc.fileFormat.toUpperCase()}, ${(doc.fileSize / 1024).toFixed(2)} KB`);
    console.log(`   Download: ${getDownloadUrl(doc.assetId)}`);
  });
}

/**
 * Example 2: Filtered search
 */
async function example2_FilteredSearch() {
  console.log('\nExample 2: Search for datasheets in Danish');

  const results = await searchDocuments('', 0, {
    languages: ['da'],
    documentTypes: ['technical-data-sheet', 'product-data-sheet']
  });

  console.log(`Found ${results.nbHits} datasheets in Danish`);

  // Show facet counts
  if (results.facets && results.facets.documentTypes) {
    console.log('\nDocument types:');
    Object.entries(results.facets.documentTypes).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
  }
}

/**
 * Example 3: Pagination
 */
async function example3_Pagination() {
  console.log('\nExample 3: Paginate through search results');

  const query = 'gips';
  let page = 0;
  let totalResults = 0;

  const firstPage = await searchDocuments(query, page);
  totalResults = firstPage.nbHits;

  console.log(`Total results for "${query}": ${totalResults}`);
  console.log(`Total pages: ${firstPage.nbPages}`);

  // Get all pages
  for (let p = 0; p < Math.min(firstPage.nbPages, 3); p++) {
    const results = await searchDocuments(query, p);
    console.log(`\nPage ${p + 1}:`);
    results.hits.forEach((doc, index) => {
      console.log(`  ${p * 20 + index + 1}. ${doc.name} (${doc.fileFormat})`);
    });
  }
}

/**
 * Example 4: Get facet counts
 */
async function example4_GetFacets() {
  console.log('\nExample 4: Get available facets');

  const results = await searchDocuments('', 0, {});

  console.log('\nAvailable Languages:');
  if (results.facets && results.facets.language) {
    Object.entries(results.facets.language).forEach(([lang, count]) => {
      console.log(`  ${lang}: ${count} documents`);
    });
  }

  console.log('\nAvailable Divisions:');
  if (results.facets && results.facets.division) {
    Object.entries(results.facets.division).forEach(([division, count]) => {
      console.log(`  ${division}: ${count} documents`);
    });
  }

  console.log('\nTop Document Types:');
  if (results.facets && results.facets.documentTypes) {
    const sorted = Object.entries(results.facets.documentTypes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    sorted.forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
  }
}

/**
 * Example 5: Download a document
 */
async function example5_DownloadDocument() {
  console.log('\nExample 5: Download a document');

  // First, search for a document
  const results = await searchDocuments('Ultra Board', 0);

  if (results.hits.length > 0) {
    const doc = results.hits[0];
    console.log(`Downloading: ${doc.name}`);
    console.log(`Asset ID: ${doc.assetId}`);

    // In Node.js, you can save to file:
    const blob = await downloadDocument(doc.assetId);
    console.log(`Downloaded ${blob.size} bytes`);

    // In browser, you can trigger download:
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = `${doc.name}.${doc.fileFormat}`;
    // a.click();

    // Or just use the direct URL:
    console.log(`Direct download URL: ${getDownloadUrl(doc.assetId)}`);
  }
}

/**
 * Example 6: Filter by product category
 */
async function example6_FilterByCategory() {
  console.log('\nExample 6: Filter by product category');

  const results = await searchDocuments('', 0, {
    languages: ['da'],
    productCategory: 'Plader'  // Boards
  });

  console.log(`Found ${results.nbHits} documents in category "Plader"`);

  results.hits.slice(0, 5).forEach((doc, index) => {
    console.log(`\n${index + 1}. ${doc.name}`);
    if (doc.productNames && doc.productNames.length > 0) {
      console.log(`   Products: ${doc.productNames.join(', ')}`);
    }
  });
}

/**
 * Example 7: Search with multiple filters
 */
async function example7_ComplexFiltering() {
  console.log('\nExample 7: Complex filtering - Manuals for Knauf Gypsum products in Danish');

  const results = await searchDocuments('', 0, {
    languages: ['da'],
    documentTypes: ['manual'],
    division: 'Knauf Gypsum'
  });

  console.log(`Found ${results.nbHits} manuals`);

  results.hits.slice(0, 10).forEach((doc, index) => {
    console.log(`\n${index + 1}. ${doc.name}`);
    console.log(`   Pages: ${doc.pageCount || 'N/A'}`);
    console.log(`   Size: ${(doc.fileSize / 1024).toFixed(2)} KB`);
    console.log(`   Updated: ${new Date(doc.lastUpdated).toLocaleDateString('da-DK')}`);
  });
}

// ============================================================================
// RUN EXAMPLES
// ============================================================================

async function runAllExamples() {
  try {
    await example1_BasicSearch();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting

    await example2_FilteredSearch();
    await new Promise(resolve => setTimeout(resolve, 1000));

    await example3_Pagination();
    await new Promise(resolve => setTimeout(resolve, 1000));

    await example4_GetFacets();
    await new Promise(resolve => setTimeout(resolve, 1000));

    await example5_DownloadDocument();
    await new Promise(resolve => setTimeout(resolve, 1000));

    await example6_FilterByCategory();
    await new Promise(resolve => setTimeout(resolve, 1000));

    await example7_ComplexFiltering();

    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Uncomment to run all examples:
// runAllExamples();

// Export functions for use as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    searchDocuments,
    downloadDocument,
    getDownloadUrl,
    buildFacetFilters
  };
}
