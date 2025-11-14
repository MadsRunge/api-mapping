#!/bin/bash

# This script provides examples of how to interact with the BSF.dk API using cURL.

# Search the site
echo "Searching the site for 'test'..."
curl -X POST https://bsf.dk/ubaseline/api/BsfSearchApi/Search \
-H "Content-Type: application/json" \
-d '{"query":"test","page":0,"tagCategoryIds":[],"tagIds":[],"searchableTypes":[]}'

echo -e "\n"

# Get news previews
echo "Getting news previews..."
curl -X POST https://bsf.dk/ubaseline/api/NewsPreview/GetNewsPreviews \
-H "Content-Type: application/json" \
-d '{"year":null,"index":0,"step":3}'
