# Products API

## Endpoints

```
GET /api/products/
- Query params: { category?: string, cursor?: number, limit?: number }
- Response: { items: Product[], nextCursor?: number }

GET /api/products/:id/
- Response: Product
```

## Data Models

```typescript
interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  images: string[]
  description: string
  specs?: {
    name: string
    options: string[]
  }[]
  tags: string[]
  shop: {
    id: number
    name: string
    avatar: string
  }
}
```