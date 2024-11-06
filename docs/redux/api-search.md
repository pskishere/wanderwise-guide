# Search API Documentation

## Endpoints

```
GET /api/search/
- Query params: { q: string, type?: 'post' | 'product', page?: number }
- Response: { 
    posts?: Post[], 
    products?: Product[],
    hasMore: boolean,
    nextPage?: number 
  }

GET /api/search/suggestions/
- Query params: { q: string }
- Response: { 
    keywords: string[],
    categories: string[],
    locations: string[] 
  }
```

## Data Models

```typescript
interface SearchResult {
  posts?: Post[]
  products?: Product[]
  hasMore: boolean
  nextPage?: number
}

interface SearchSuggestion {
  keywords: string[]
  categories: string[]
  locations: string[]
}
```