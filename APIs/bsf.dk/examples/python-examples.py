import requests
import json

BASE_URL = "https://bsf.dk/ubaseline/api"

# Search the site
def search_site(query, page=0, tag_category_ids=None, tag_ids=None, searchable_types=None):
    if tag_category_ids is None:
        tag_category_ids = []
    if tag_ids is None:
        tag_ids = []
    if searchable_types is None:
        searchable_types = []

    url = f"{BASE_URL}/BsfSearchApi/Search"
    headers = {"Content-Type": "application/json"}
    payload = {
        "query": query,
        "page": page,
        "tagCategoryIds": tag_category_ids,
        "tagIds": tag_ids,
        "searchableTypes": searchable_types,
    }
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    response.raise_for_status()
    return response.json()

# Get news previews
def get_news_previews(year=None, index=0, step=3):
    url = f"{BASE_URL}/NewsPreview/GetNewsPreviews"
    headers = {"Content-Type": "application/json"}
    payload = {
        "year": year,
        "index": index,
        "step": step,
    }
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    response.raise_for_status()
    return response.json()

if __name__ == "__main__":
    print("Searching the site for 'test'...")
    search_results = search_site("test")
    print(json.dumps(search_results, indent=2))

    print("\nGetting news previews...")
    news_previews = get_news_previews()
    print(json.dumps(news_previews, indent=2))
