# Bygningsreglementet.dk API Documentation Index

Welcome to the complete API documentation for Bygningsreglementet.dk (Danish Building Regulations API).

## 📚 Documentation Structure

### Quick Start
- **[README.md](./README.md)** - Start here! User-friendly guide with quick examples and common use cases

### Technical Documentation
- **[openapi.yaml](./openapi.yaml)** - Complete OpenAPI 3.0 specification (machine-readable)
- **[workbook.md](./workbook.md)** - Detailed technical discovery process and architecture insights

### Code Examples
All examples are located in the [examples/](./examples/) directory:

- **[bash-examples.sh](./examples/bash-examples.sh)** - cURL/Bash scripts with 12 examples
- **[javascript-examples.js](./examples/javascript-examples.js)** - JavaScript/Node.js examples with API client class
- **[python-examples.py](./examples/python-examples.py)** - Python examples with comprehensive API client

## 🚀 Getting Started

### For Beginners
1. Read the [README.md](./README.md) for an overview
2. Try the Quick Start examples
3. Check out [bash-examples.sh](./examples/bash-examples.sh) for simple cURL commands

### For Developers
1. Review the [OpenAPI specification](./openapi.yaml) for complete API details
2. Use the code examples in your preferred language:
   - [JavaScript/Node.js](./examples/javascript-examples.js)
   - [Python](./examples/python-examples.py)
   - [Bash/cURL](./examples/bash-examples.sh)

### For Technical Teams
1. Read the [workbook.md](./workbook.md) for discovery methodology
2. Understand the architecture and technical constraints
3. Review the API analysis and testing observations

## 📖 What's Inside Each Document

### README.md
- API overview and quick start
- Endpoint documentation
- Parameter reference
- Common use cases
- Response structure
- Error handling
- Best practices

### openapi.yaml
- Complete OpenAPI 3.0 specification
- All endpoint definitions
- Request/response schemas
- Parameter validation rules
- Example requests and responses
- Can be used with:
  - Swagger UI
  - Postman
  - API testing tools
  - Code generators

### workbook.md
- Discovery methodology using Chrome DevTools MCP
- Complete network traffic analysis
- API patterns and architecture
- Performance observations
- Security analysis
- Technical constraints
- Recommendations for integration

### Examples Directory

#### bash-examples.sh
12 examples including:
- Simple searches
- Category filtering
- Pagination
- URL encoding
- Error handling
- PDF extraction
- Custom formatting

#### javascript-examples.js
Comprehensive JavaScript examples:
- Fetch API usage
- API client class
- Async/await patterns
- React hooks
- Express.js wrapper
- Pagination helpers
- Error handling

#### python-examples.py
Python examples featuring:
- Requests library usage
- API client class
- Generators for pagination
- Data analysis
- Export to JSON/CSV
- Flask API wrapper
- Async/await (aiohttp)

## 🔍 API Overview

**Base URL:** `https://www.bygningsreglementet.dk`

**Single Endpoint:** `GET /api/search`

**Key Features:**
- ✅ No authentication required
- ✅ Full-text search across regulations
- ✅ Category filtering
- ✅ Pagination support
- ✅ JSON responses
- ✅ Cloudflare CDN caching

**Primary Use Case:** Search and discover Danish Building Regulations (BR18), guidelines, and related documents.

## 📊 Quick Reference

### Search Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `term` | Yes | - | Search query |
| `culture` | No | `da` | Language (da/en) |
| `pageNumber` | No | `1` | Page number |
| `pageSize` | No | `10` | Results per page |
| `category_c` | No | `""` | Category filter |

### Category Filters

- `""` - All results
- `br18` - BR18 regulations
- `kravbestemmelser` - Requirements
- `bilag` - Appendices
- `nationale-annekser` - National annexes
- `vejledninger` - Guidelines
- `vejledning` - Guidance
- `dokumenter` - Documents

### Response Structure

```json
{
  "filters": [...],
  "statusCode": 200,
  "pagination": {...},
  "data": [...],
  "errorMessage": null,
  "errorId": null,
  "timestampUtc": "2025-11-12T12:22:10Z"
}
```

## 🛠️ Tools & Integration

### Compatible Tools

This documentation works with:
- **Swagger UI** - Import openapi.yaml
- **Postman** - Import OpenAPI spec
- **Insomnia** - API testing
- **OpenAPI Generator** - Generate client SDKs
- **API Blueprint** - Documentation site

### Language Support

Example code provided for:
- **Bash/cURL** - Command-line usage
- **JavaScript** - Browser & Node.js
- **Python** - Scripts & applications

Need another language? The OpenAPI spec can generate clients for:
- Java
- Go
- Ruby
- PHP
- C#
- Swift
- And many more...

## 📝 Usage Examples

### Simple Search (cURL)
```bash
curl "https://www.bygningsreglementet.dk/api/search?term=brand&culture=da"
```

### Using JavaScript
```javascript
const api = new BygningsreglementAPI();
const results = await api.search('energi', { category: 'kravbestemmelser' });
```

### Using Python
```python
api = BygningsreglementAPI()
results = api.search('ventilation', category='vejledninger')
```

## 🎯 Common Tasks

### Task: Search for Fire Safety Regulations
- **File**: [README.md](./README.md#common-use-cases)
- **Example**: bash-examples.sh (Example 1)

### Task: Paginate Through Results
- **File**: [README.md](./README.md#common-use-cases)
- **Examples**:
  - JavaScript: [javascript-examples.js](./examples/javascript-examples.js) (Example 3, 8)
  - Python: [python-examples.py](./examples/python-examples.py) (Example 4)

### Task: Filter by Category
- **File**: [README.md](./README.md#category-filters)
- **Examples**: All example files include filtering

### Task: Build a Search Interface
- **JavaScript**: [javascript-examples.js](./examples/javascript-examples.js) (React hook example)
- **Python**: [python-examples.py](./examples/python-examples.py) (Flask wrapper)

### Task: Understand API Architecture
- **File**: [workbook.md](./workbook.md#technical-architecture-insights)

## 🔗 External Resources

- **Official Website**: https://www.bygningsreglementet.dk/
- **Contact Email**: byggeri@sbst.dk
- **Organization**: Social- og Boligstyrelsen

## 🤝 Contributing

Found an error or want to contribute?
- Issues and corrections welcome
- Additional language examples appreciated
- Integration guides helpful

## 📜 License

This API documentation is provided as-is for public use. The Danish Building Regulations are public domain.

---

## Navigation Map

```
bygningsreglementet.dk/
├── INDEX.md (you are here)
├── README.md (start here)
├── openapi.yaml (API specification)
├── workbook.md (technical details)
└── examples/
    ├── bash-examples.sh
    ├── javascript-examples.js
    └── python-examples.py
```

---

**Last Updated**: November 12, 2025
**API Version**: 1.0.0
**Documentation Version**: 1.0.0
