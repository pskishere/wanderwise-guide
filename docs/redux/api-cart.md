# Cart API Documentation

## Endpoints

```
GET /api/cart/
- Response: CartItem[]

POST /api/cart/
- Request: { productId: number, quantity: number, specs?: string[] }
- Response: CartItem

PATCH /api/cart/:id/
- Request: { quantity: number }
- Response: CartItem

DELETE /api/cart/:id/
- Response: { success: true }
```