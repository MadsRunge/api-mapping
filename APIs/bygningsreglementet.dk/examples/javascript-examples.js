// Bygningsreglementet.dk API - JavaScript/Node.js Examples
// ==========================================================

const BASE_URL = 'https://www.bygningsreglementet.dk/api/search';

// Example 1: Simple Search using Fetch API
async function simpleSearch() {
  console.log('=== Example 1: Simple Search ===');

  const params = new URLSearchParams({
    term: 'brand',
    culture: 'da',
    pageNumber: 1
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    const data = await response.json();

    console.log(`Found ${data.pagination.totalResults} results`);
    console.log('First result:', data.data[0].title);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 2: Search with Category Filter
async function searchWithCategory() {
  console.log('\n=== Example 2: Search with Category Filter ===');

  const params = {
    term: 'energi',
    culture: 'da',
    category_c: 'kravbestemmelser'
  };

  try {
    const url = `${BASE_URL}?${new URLSearchParams(params)}`;
    const response = await fetch(url);
    const data = await response.json();

    data.data.forEach((result, index) => {
      console.log(`${index + 1}. ${result.title}`);
      console.log(`   Score: ${result.score}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 3: Paginated Search
async function paginatedSearch() {
  console.log('\n=== Example 3: Paginated Search ===');

  async function getPage(pageNumber) {
    const params = new URLSearchParams({
      term: 'konstruktion',
      culture: 'da',
      pageNumber,
      pageSize: 5
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    return await response.json();
  }

  try {
    const page1 = await getPage(1);
    console.log(`Page 1 of ${page1.pagination.totalPages}`);
    console.log(`Results 1-${page1.data.length}:`);
    page1.data.forEach((r, i) => console.log(`  ${i+1}. ${r.title}`));

    if (page1.pagination.nextPageUrl) {
      console.log('\nNext page available:', page1.pagination.nextPageUrl);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 4: Search Class with Error Handling
class BygningsreglementAPI {
  constructor() {
    this.baseURL = BASE_URL;
  }

  async search(term, options = {}) {
    const params = new URLSearchParams({
      term,
      culture: options.culture || 'da',
      pageNumber: options.pageNumber || 1,
      pageSize: options.pageSize || 10,
      ...(options.category && { category_c: options.category })
    });

    try {
      const response = await fetch(`${this.baseURL}?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      return data;
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  }

  async getAllResults(term, options = {}) {
    const results = [];
    let pageNumber = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.search(term, { ...options, pageNumber });
      results.push(...response.data);

      hasMore = response.pagination.nextPageUrl !== null;
      pageNumber++;

      // Safety limit
      if (pageNumber > 10) break;
    }

    return results;
  }
}

// Example 5: Using the API Class
async function useAPIClass() {
  console.log('\n=== Example 4: Using API Class ===');

  const api = new BygningsreglementAPI();

  try {
    const results = await api.search('ventilation', {
      category: 'vejledninger',
      pageSize: 3
    });

    console.log(`Found ${results.pagination.totalResults} guidelines about ventilation`);
    console.log('Top 3 results:');
    results.data.forEach((r, i) => {
      console.log(`${i+1}. ${r.title}`);
      console.log(`   URL: ${r.url}`);
    });
  } catch (error) {
    console.error('Failed:', error.message);
  }
}

// Example 6: Filter Results
async function filterResults() {
  console.log('\n=== Example 5: Filter Results ===');

  const params = new URLSearchParams({
    term: 'brand',
    culture: 'da',
    pageSize: 50
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    const data = await response.json();

    // Filter for PDFs only
    const pdfResults = data.data.filter(r => r.url.endsWith('.pdf'));
    console.log(`PDF documents found: ${pdfResults.length}`);

    // Filter by score threshold
    const highScoreResults = data.data.filter(r => r.score > 0.02);
    console.log(`High relevance results: ${highScoreResults.length}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 7: Get All Available Categories
async function getCategories() {
  console.log('\n=== Example 6: Get Available Categories ===');

  try {
    const response = await fetch(`${BASE_URL}?term=test&culture=da`);
    const data = await response.json();

    console.log('Available categories:');
    data.filters.forEach(filter => {
      const urlObj = new URL(filter.url);
      const category = urlObj.searchParams.get('category_c') || '(all)';
      console.log(`- ${filter.name}: category_c=${category}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 8: Search with Autocomplete
async function autocompleteSearch(query) {
  console.log(`\n=== Example 7: Autocomplete for "${query}" ===`);

  const params = new URLSearchParams({
    term: query,
    culture: 'da',
    pageSize: 5
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    const data = await response.json();

    return data.data.map(r => ({
      title: r.title,
      url: r.url,
      preview: r.text.substring(0, 100) + '...'
    }));
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// Example 9: Async Iterator for Pagination
async function* paginateResults(term, options = {}) {
  let pageNumber = 1;
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({
      term,
      culture: options.culture || 'da',
      pageNumber,
      pageSize: options.pageSize || 10,
      ...(options.category && { category_c: options.category })
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    const data = await response.json();

    yield data;

    hasMore = data.pagination.nextPageUrl !== null;
    pageNumber++;
  }
}

async function useAsyncIterator() {
  console.log('\n=== Example 8: Async Iterator ===');

  let resultCount = 0;

  for await (const page of paginateResults('brand', { pageSize: 10 })) {
    resultCount += page.data.length;
    console.log(`Page ${page.pagination.pageNumber}: ${page.data.length} results`);

    // Stop after 3 pages for demo
    if (page.pagination.pageNumber >= 3) break;
  }

  console.log(`Total results fetched: ${resultCount}`);
}

// Example 10: React Hook Example
function useBygningsreglementSearch() {
  // This would work in a React component
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (term, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        term,
        culture: options.culture || 'da',
        pageNumber: options.pageNumber || 1,
        pageSize: options.pageSize || 10,
        ...(options.category && { category_c: options.category })
      });

      const response = await fetch(`${BASE_URL}?${params}`);
      const data = await response.json();

      if (data.errorMessage) {
        throw new Error(data.errorMessage);
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
}

// Example 11: Express.js API Wrapper
function createExpressRoutes(app) {
  app.get('/api/regulations/search', async (req, res) => {
    try {
      const { term, category, page = 1, size = 10 } = req.query;

      if (!term) {
        return res.status(400).json({ error: 'Search term required' });
      }

      const params = new URLSearchParams({
        term,
        culture: 'da',
        pageNumber: page,
        pageSize: size,
        ...(category && { category_c: category })
      });

      const response = await fetch(`${BASE_URL}?${params}`);
      const data = await response.json();

      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

// Run all examples
async function runAllExamples() {
  await simpleSearch();
  await searchWithCategory();
  await paginatedSearch();
  await useAPIClass();
  await filterResults();
  await getCategories();

  const suggestions = await autocompleteSearch('energi');
  console.log('\n=== Autocomplete Results ===');
  suggestions.forEach(s => console.log(`- ${s.title}`));

  await useAsyncIterator();

  console.log('\n=== All Examples Complete ===');
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BygningsreglementAPI,
    autocompleteSearch,
    paginateResults,
    useBygningsreglementSearch,
    createExpressRoutes
  };
}

// Run examples if executed directly
if (typeof require !== 'undefined' && require.main === module) {
  runAllExamples().catch(console.error);
}
