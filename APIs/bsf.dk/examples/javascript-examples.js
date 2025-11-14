const BASE_URL = "https://bsf.dk/ubaseline/api";

// Search the site
async function searchSite(query, page = 0, tagCategoryIds = [], tagIds = [], searchableTypes = []) {
  const url = `${BASE_URL}/BsfSearchApi/Search`;
  const headers = { "Content-Type": "application/json" };
  const payload = {
    query,
    page,
    tagCategoryIds,
    tagIds,
    searchableTypes,
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// Get news previews
async function getNewsPreviews(year = null, index = 0, step = 3) {
  const url = `${BASE_URL}/NewsPreview/GetNewsPreviews`;
  const headers = { "Content-Type": "application/json" };
  const payload = {
    year,
    index,
    step,
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

(async () => {
  console.log("Searching the site for 'test'...");
  const searchResults = await searchSite("test");
  console.log(JSON.stringify(searchResults, null, 2));

  console.log("\nGetting news previews...");
  const newsPreviews = await getNewsPreviews();
  console.log(JSON.stringify(newsPreviews, null, 2));
})();
