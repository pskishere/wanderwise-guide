# Orders API

## Endpoints

```
GET /api/orders/
- Query params: { status?: string, page?: number }
- Response: { orders: Order[], hasMore: boolean, nextPage?: number }

GET /api/orders/:id/
- Response: Order

POST /api/orders/
- Request: { items: CartItem[], addressId: string, paymentMethod: string }
- Response: Order
```

## Data Models

```typescript
interface Order {
  id: string
  status: string
  totalAmount: number
  freight: number
  address?: {
    name: string
    phone: string
    detail: string
    fullAddress?: string
  }
  timeline: {
    time: string
    status: string
  }[]
  items: {
    id: number
    title: string
    price: number
    image: string
    quantity: number
    specs?: string[]
  }[]
}
```