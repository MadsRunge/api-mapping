#!/bin/bash

# Bygningsreglementet.dk API - Bash/cURL Examples
# =================================================

BASE_URL="https://www.bygningsreglementet.dk/api/search"

echo "=== Bygningsreglementet.dk API Examples ==="
echo ""

# Example 1: Simple Search
echo "1. Simple search for 'brand' (fire safety)"
curl -s "${BASE_URL}?term=brand&culture=da&pageNumber=1" | jq '.'
echo ""
echo "---"
echo ""

# Example 2: Search with Category Filter
echo "2. Search in requirements category"
curl -s "${BASE_URL}?term=energi&culture=da&category_c=kravbestemmelser" | jq '.data[] | {title, url}'
echo ""
echo "---"
echo ""

# Example 3: Paginated Search
echo "3. Get page 2 of results"
curl -s "${BASE_URL}?term=brand&culture=da&pageNumber=2&pageSize=5" | jq '.pagination'
echo ""
echo "---"
echo ""

# Example 4: Count Total Results
echo "4. Count total results for 'konstruktion'"
RESULTS=$(curl -s "${BASE_URL}?term=konstruktion&culture=da" | jq '.pagination.totalResults')
echo "Total results: $RESULTS"
echo ""
echo "---"
echo ""

# Example 5: Get First Result URL
echo "5. Get URL of most relevant result for 'brand'"
URL=$(curl -s "${BASE_URL}?term=brand&culture=da" | jq -r '.data[0].url')
echo "Most relevant: $URL"
echo ""
echo "---"
echo ""

# Example 6: Search with URL Encoding
echo "6. Search for paragraph § 250"
QUERY=$(echo "§ 250" | jq -sRr @uri)
curl -s "${BASE_URL}?term=${QUERY}&culture=da" | jq '.data[] | {title, score}'
echo ""
echo "---"
echo ""

# Example 7: Filter by Multiple Criteria
echo "7. Search 'ventilation' in guidelines category with custom page size"
curl -s "${BASE_URL}?term=ventilation&culture=da&category_c=vejledninger&pageSize=3" | jq '{
  total: .pagination.totalResults,
  results: .data | map({title, score})
}'
echo ""
echo "---"
echo ""

# Example 8: Get Available Filters
echo "8. Get all available category filters"
curl -s "${BASE_URL}?term=test&culture=da" | jq '.filters[] | {name, category: (.url | split("category_c=")[1] | split("&")[0])}'
echo ""
echo "---"
echo ""

# Example 9: Paginate Through All Results
echo "9. Paginate through first 3 pages"
for PAGE in {1..3}; do
  echo "Page $PAGE:"
  curl -s "${BASE_URL}?term=brand&culture=da&pageNumber=${PAGE}&pageSize=2" | jq '.data[] | .title'
  echo ""
done
echo "---"
echo ""

# Example 10: Error Handling
echo "10. Example with error handling"
RESPONSE=$(curl -s -w "\n%{http_code}" "${BASE_URL}?term=test&culture=da")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" == "200" ]; then
  echo "Success! Found $(echo "$BODY" | jq '.pagination.totalResults') results"
else
  echo "Error: HTTP $HTTP_CODE"
  echo "$BODY" | jq '.errorMessage'
fi
echo ""
echo "---"
echo ""

# Example 11: Extract and Download PDFs
echo "11. Extract PDF URLs from search results"
curl -s "${BASE_URL}?term=brand&culture=da&category_c=vejledninger&pageSize=5" | \
  jq -r '.data[] | select(.url | endswith(".pdf")) | .url' | \
  head -3
echo ""
echo "To download a PDF, use: curl -O [URL]"
echo ""
echo "---"
echo ""

# Example 12: Pretty Print with Custom Format
echo "12. Custom formatted output"
curl -s "${BASE_URL}?term=energi&culture=da&pageSize=3" | jq -r '
  "Search Results for \"energi\"",
  "=" * 50,
  "",
  "Total Results: \(.pagination.totalResults)",
  "Page \(.pagination.pageNumber) of \(.pagination.totalPages)",
  "",
  (.data[] |
    "Title: \(.title)",
    "Score: \(.score)",
    "URL: \(.url)",
    "-" * 50
  )
'

echo ""
echo "=== Examples Complete ==="
