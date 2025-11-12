# API Mapping Project

Complete API documentation for various websites discovered using Chrome DevTools MCP Server.

## 📁 Documented APIs

### [Bygningsreglementet.dk](./APIs/bygningsreglementet.dk/)
**Danish Building Regulations Search API**

- **Base URL**: `https://www.bygningsreglementet.dk`
- **Endpoint**: `GET /api/search`
- **Authentication**: None (public API)
- **Purpose**: Search Danish building regulations, guidelines, and documents

**Documentation:**
- [Quick Start Guide](./APIs/bygningsreglementet.dk/README.md)
- [OpenAPI Specification](./APIs/bygningsreglementet.dk/openapi.yaml)
- [Technical Workbook](./APIs/bygningsreglementet.dk/workbook.md)
- [Code Examples](./APIs/bygningsreglementet.dk/examples/)
  - Bash/cURL
  - JavaScript/Node.js
  - Python
- [Complete Index](./APIs/bygningsreglementet.dk/INDEX.md)

**Discovery Date**: November 12, 2025
**Tools Used**: Chrome DevTools MCP Server

---

## 🛠️ Discovery Methodology

All APIs in this repository were mapped using:
- **Chrome DevTools MCP Server** - Browser automation and network capture
- **Manual exploration** - Interactive testing and validation
- **Comprehensive documentation** - OpenAPI specs, workbooks, and examples

## 📚 Documentation Structure

Each API includes:
1. **README.md** - User-friendly quick start guide
2. **openapi.yaml** - Complete OpenAPI 3.0 specification
3. **workbook.md** - Technical discovery process and insights
4. **examples/** - Code examples in multiple languages
5. **INDEX.md** - Navigation guide for all documentation

## 🚀 Quick Start

To use any documented API:

1. Navigate to the API folder (e.g., `APIs/bygningsreglementet.dk/`)
2. Read the README.md for quick start
3. Check the examples directory for your preferred language
4. Import openapi.yaml into your API tool (Postman, Swagger, etc.)

## 📖 How to Read the Documentation

### For Quick Integration
- Start with **README.md**
- Copy examples from **examples/** directory
- Reference **openapi.yaml** for details

### For Deep Understanding
- Read **workbook.md** for technical insights
- Review **openapi.yaml** for complete API specification
- Study examples for best practices

### For API Testing
- Import **openapi.yaml** into Postman/Insomnia
- Use examples as starting point
- Modify parameters as needed

## 🔧 Tools & Compatibility

### OpenAPI Specification Compatible With:
- Swagger UI
- Postman
- Insomnia
- ReDoc
- OpenAPI Generator (client SDK generation)
- API Blueprint

### Example Code Languages:
- Bash/cURL (command line)
- JavaScript/Node.js
- Python

## 📊 Statistics

### Bygningsreglementet.dk Documentation
- **Total Files**: 7 files
- **Main Documentation**: ~36 KB
- **Code Examples**: ~25 KB
- **Endpoints Documented**: 1
- **Example Scripts**: 12+ examples per language
- **Total Lines**: 2000+ lines of documentation and code

## 🎯 Use Cases

### Search Danish Building Regulations
```bash
curl "https://www.bygningsreglementet.dk/api/search?term=energi&culture=da"
```

### Integrate in Your Application
```javascript
const api = new BygningsreglementAPI();
const results = await api.search('brand', {category: 'kravbestemmelser'});
```

### Build a Search Portal
```python
api = BygningsreglementAPI()
all_results = api.search_all('ventilation', category='vejledninger')
```

## 🤝 Contributing

To add a new API documentation:

1. Create folder: `APIs/[site-name]/`
2. Follow the documentation structure:
   - README.md (quick start)
   - openapi.yaml (specification)
   - workbook.md (technical details)
   - examples/ (code samples)
   - INDEX.md (navigation)

3. Use Chrome DevTools MCP Server for discovery
4. Document all findings comprehensively

## 📜 License

All API documentation is provided as-is for educational and integration purposes.

Individual APIs may have their own terms of service - please check the official documentation of each API.

## 🔗 Resources

- [Chrome DevTools MCP Server](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)
- [Claude Code Documentation](https://docs.claude.com/claude-code)

---

**Project Maintained By**: API Discovery Team
**Last Updated**: November 12, 2025
**Version**: 1.0.0
