# Cart API Documentation

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

interface CartResponse {
  items: CartItem[]
}

interface CartError {
  error: string
}
```

## Error Codes

- `CART_NOT_FOUND`: Cart items not found
- `INVALID_QUANTITY`: Invalid quantity specified
- `PRODUCT_NOT_FOUND`: Product not found
- `OUT_OF_STOCK`: Product is out of stock
- `NETWORK_ERROR`: Network connection error

## Example Usage

```typescript
// Fetch cart items
const response = await fetch('/api/cart/');
const cartItems = await response.json();

// Add item to cart
const response = await fetch('/api/cart/', {
  method: 'POST',
  body: JSON.stringify({
    productId: 123,
    quantity: 1,
    specs: ['红色', 'L码']
  })
});

// Update item quantity
const response = await fetch('/api/cart/123', {
  method: 'PATCH',
  body: JSON.stringify({
    quantity: 2
  })
});

// Remove item from cart
const response = await fetch('/api/cart/123', {
  method: 'DELETE'
});
```