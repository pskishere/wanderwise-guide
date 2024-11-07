# Cart API

## Endpoints

```
GET /api/cart/
- Response: CartItem[]
- Error Response: { error: string }

POST /api/cart/
- Request: { productId: number, quantity: number, specs?: string[] }
- Response: CartItem
- Error Response: { error: string }

PATCH /api/cart/:id/
- Request: { quantity: number }
- Response: CartItem
- Error Response: { error: string }

DELETE /api/cart/:id/
- Response: { success: true }
- Error Response: { error: string }
```

## Data Models

```typescript
interface CartItem {
  id: number
  productId: number
  title: string
  price: number
  image: string
  quantity: number
  selected: boolean
  specs?: string[]
  stock?: number
}

interface CartState {
  items: CartItem[]
  loading: boolean
  error: string | null
}
```

## Error Codes

- `CART_NOT_FOUND`: Cart items not found
- `INVALID_QUANTITY`: Invalid quantity specified
- `PRODUCT_NOT_FOUND`: Product not found
- `OUT_OF_STOCK`: Product is out of stock
- `NETWORK_ERROR`: Network connection error