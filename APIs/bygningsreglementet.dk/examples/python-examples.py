#!/usr/bin/env python3
"""
Bygningsreglementet.dk API - Python Examples
=============================================
"""

import requests
from typing import Dict, List, Optional, Generator
from urllib.parse import urlencode
import json


BASE_URL = "https://www.bygningsreglementet.dk/api/search"


# Example 1: Simple Search
def simple_search():
    """Basic search example"""
    print("=== Example 1: Simple Search ===")

    params = {
        "term": "brand",
        "culture": "da",
        "pageNumber": 1
    }

    response = requests.get(BASE_URL, params=params)
    data = response.json()

    print(f"Found {data['pagination']['totalResults']} results")
    print(f"First result: {data['data'][0]['title']}")
    print()


# Example 2: Search with Category Filter
def search_with_category():
    """Search in specific category"""
    print("=== Example 2: Search with Category Filter ===")

    params = {
        "term": "energi",
        "culture": "da",
        "category_c": "kravbestemmelser"
    }

    response = requests.get(BASE_URL, params=params)
    data = response.json()

    for i, result in enumerate(data['data'], 1):
        print(f"{i}. {result['title']}")
        print(f"   Score: {result['score']}")
    print()


# Example 3: API Client Class
class BygningsreglementAPI:
    """Python client for Bygningsreglementet.dk API"""

    def __init__(self, base_url: str = BASE_URL):
        self.base_url = base_url
        self.session = requests.Session()

    def search(
        self,
        term: str,
        culture: str = "da",
        page_number: int = 1,
        page_size: int = 10,
        category: Optional[str] = None
    ) -> Dict:
        """
        Search building regulations

        Args:
            term: Search query
            culture: Language code (da or en)
            page_number: Page number (1-indexed)
            page_size: Results per page
            category: Optional category filter

        Returns:
            API response as dictionary

        Raises:
            requests.exceptions.RequestException: On request failure
        """
        params = {
            "term": term,
            "culture": culture,
            "pageNumber": page_number,
            "pageSize": page_size
        }

        if category:
            params["category_c"] = category

        response = self.session.get(self.base_url, params=params)
        response.raise_for_status()

        data = response.json()

        if data.get("errorMessage"):
            raise Exception(data["errorMessage"])

        return data

    def search_all(
        self,
        term: str,
        culture: str = "da",
        category: Optional[str] = None,
        max_pages: int = 10
    ) -> List[Dict]:
        """
        Get all results across multiple pages

        Args:
            term: Search query
            culture: Language code
            category: Optional category filter
            max_pages: Maximum number of pages to fetch

        Returns:
            List of all results
        """
        all_results = []
        page_number = 1

        while page_number <= max_pages:
            data = self.search(
                term=term,
                culture=culture,
                page_number=page_number,
                category=category
            )

            all_results.extend(data["data"])

            if not data["pagination"]["nextPageUrl"]:
                break

            page_number += 1

        return all_results

    def iterate_pages(
        self,
        term: str,
        culture: str = "da",
        page_size: int = 10,
        category: Optional[str] = None
    ) -> Generator[Dict, None, None]:
        """
        Generator that yields pages of results

        Args:
            term: Search query
            culture: Language code
            page_size: Results per page
            category: Optional category filter

        Yields:
            Page data dictionaries
        """
        page_number = 1

        while True:
            data = self.search(
                term=term,
                culture=culture,
                page_number=page_number,
                page_size=page_size,
                category=category
            )

            yield data

            if not data["pagination"]["nextPageUrl"]:
                break

            page_number += 1

    def get_categories(self) -> List[Dict]:
        """Get all available category filters"""
        data = self.search(term="test", page_size=1)
        return data["filters"]


# Example 4: Using the API Client
def use_api_client():
    """Demonstrate API client usage"""
    print("=== Example 3: Using API Client ===")

    api = BygningsreglementAPI()

    try:
        results = api.search("ventilation", category="vejledninger", page_size=3)

        print(f"Found {results['pagination']['totalResults']} guidelines")
        print("Top 3 results:")

        for i, result in enumerate(results['data'], 1):
            print(f"{i}. {result['title']}")
            print(f"   URL: {result['url']}")

    except Exception as e:
        print(f"Error: {e}")

    print()


# Example 5: Pagination
def paginated_search():
    """Demonstrate pagination"""
    print("=== Example 4: Pagination ===")

    api = BygningsreglementAPI()

    for page_data in api.iterate_pages("brand", page_size=5):
        page = page_data["pagination"]
        print(f"Page {page['pageNumber']} of {page['totalPages']}")
        print(f"Results: {len(page_data['data'])}")

        # Stop after 3 pages for demo
        if page["pageNumber"] >= 3:
            break

    print()


# Example 6: Filter and Process Results
def filter_results():
    """Filter and process search results"""
    print("=== Example 5: Filter Results ===")

    api = BygningsreglementAPI()

    results = api.search("brand", page_size=50)

    # Filter PDFs only
    pdf_results = [r for r in results["data"] if r["url"].endswith(".pdf")]
    print(f"PDF documents: {len(pdf_results)}")

    # Filter by score threshold
    high_score = [r for r in results["data"] if r["score"] > 0.02]
    print(f"High relevance results: {len(high_score)}")

    # Get unique URLs
    unique_urls = {r["url"] for r in results["data"]}
    print(f"Unique URLs: {len(unique_urls)}")

    print()


# Example 7: Export to Different Formats
def export_results():
    """Export results to different formats"""
    print("=== Example 6: Export Results ===")

    api = BygningsreglementAPI()
    results = api.search("energi", page_size=5)

    # Export to JSON file
    with open("search_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print("Exported to search_results.json")

    # Export to CSV
    import csv
    with open("search_results.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["title", "url", "score"])
        writer.writeheader()
        for result in results["data"]:
            writer.writerow({
                "title": result["title"],
                "url": result["url"],
                "score": result["score"]
            })
    print("Exported to search_results.csv")

    print()


# Example 8: Async Version with aiohttp
async def async_search_example():
    """Async search example using aiohttp"""
    import aiohttp

    print("=== Example 7: Async Search ===")

    params = {
        "term": "brand",
        "culture": "da",
        "pageNumber": 1
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(BASE_URL, params=params) as response:
            data = await response.json()
            print(f"Found {data['pagination']['totalResults']} results")
            print(f"First result: {data['data'][0]['title']}")

    print()


# Example 9: Search with Error Handling
def search_with_error_handling(term: str):
    """Search with comprehensive error handling"""
    print(f"=== Example 8: Search with Error Handling for '{term}' ===")

    try:
        response = requests.get(
            BASE_URL,
            params={"term": term, "culture": "da"},
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

        if data.get("errorMessage"):
            print(f"API Error: {data['errorMessage']}")
            return None

        print(f"Success! Found {data['pagination']['totalResults']} results")
        return data

    except requests.exceptions.Timeout:
        print("Request timed out")
    except requests.exceptions.ConnectionError:
        print("Connection error")
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

    return None


# Example 10: Build Search Index
def build_search_index(terms: List[str]) -> Dict[str, List[Dict]]:
    """Build a search index for multiple terms"""
    print("=== Example 9: Build Search Index ===")

    api = BygningsreglementAPI()
    index = {}

    for term in terms:
        print(f"Indexing '{term}'...")
        results = api.search(term, page_size=10)
        index[term] = results["data"]

    print(f"Index built with {len(index)} terms")
    return index


# Example 11: Data Analysis
def analyze_search_results(term: str):
    """Analyze search results"""
    print(f"=== Example 10: Analyze Results for '{term}' ===")

    api = BygningsreglementAPI()
    results = api.search(term, page_size=100)

    data = results["data"]

    # Calculate statistics
    scores = [r["score"] for r in data]
    avg_score = sum(scores) / len(scores) if scores else 0
    max_score = max(scores) if scores else 0
    min_score = min(scores) if scores else 0

    print(f"Total results: {len(data)}")
    print(f"Average score: {avg_score:.4f}")
    print(f"Max score: {max_score:.4f}")
    print(f"Min score: {min_score:.4f}")

    # Count document types
    pdf_count = sum(1 for r in data if r["url"].endswith(".pdf"))
    html_count = len(data) - pdf_count

    print(f"PDFs: {pdf_count}")
    print(f"HTML pages: {html_count}")

    print()


# Example 12: Flask API Wrapper
def create_flask_app():
    """Create Flask API wrapper"""
    from flask import Flask, request, jsonify

    app = Flask(__name__)
    api = BygningsreglementAPI()

    @app.route("/api/search")
    def search():
        term = request.args.get("term")
        if not term:
            return jsonify({"error": "Search term required"}), 400

        category = request.args.get("category")
        page = int(request.args.get("page", 1))
        size = int(request.args.get("size", 10))

        try:
            results = api.search(
                term=term,
                page_number=page,
                page_size=size,
                category=category
            )
            return jsonify(results)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route("/api/categories")
    def categories():
        try:
            cats = api.get_categories()
            return jsonify(cats)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return app


# Main execution
if __name__ == "__main__":
    print("Bygningsreglementet.dk API - Python Examples")
    print("=" * 50)
    print()

    # Run synchronous examples
    simple_search()
    search_with_category()
    use_api_client()
    paginated_search()
    filter_results()
    export_results()
    search_with_error_handling("brand")

    # Build index
    terms = ["brand", "energi", "ventilation"]
    index = build_search_index(terms)

    # Analyze results
    analyze_search_results("konstruktion")

    # Async example (requires asyncio)
    print("Run async example with: python -c 'import asyncio; from python_examples import async_search_example; asyncio.run(async_search_example())'")

    print("\n=== All Examples Complete ===")
