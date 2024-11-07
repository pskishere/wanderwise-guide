# API Documentation

## Table of Contents
- [Authentication](#authentication)
- [Cart](#cart)
- [Products](#products)
- [Posts](#posts)
- [Orders](#orders)
- [Search](#search)
- [Favorites](#favorites)
- [Notifications](#notifications)
- [Addresses](#addresses)

## Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

### Endpoints

```
POST /api/auth/login/
- Request: { username: string, password: string }
- Response: { token: string, user: UserProfile }

POST /api/auth/register/
- Request: { username: string, password: string, email: string }
- Response: { token: string, user: UserProfile }

GET /api/users/profile/
- Response: UserProfile
```

### Error Responses

All API endpoints return appropriate HTTP status codes and error messages:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

Common status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Cart

### Endpoints

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

### Data Models

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

### Error Codes
- `CART_NOT_FOUND`: Cart items not found
- `INVALID_QUANTITY`: Invalid quantity specified
- `PRODUCT_NOT_FOUND`: Product not found
- `OUT_OF_STOCK`: Product is out of stock
- `NETWORK_ERROR`: Network connection error

## Products

### Endpoints

```
GET /api/products/
- Query params: { category?: string, cursor?: number, limit?: number }
- Response: { items: Product[], nextCursor?: number }

GET /api/products/:id/
- Response: Product
```

### Data Models

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

## Posts

### Endpoints

```
GET /api/posts/
- Query params: { cursor?: number, category?: string }
- Response: { items: Post[], nextCursor?: number }

GET /api/posts/:id/
- Response: Post

POST /api/posts/
- Request: PostCreateData
- Response: Post

GET /api/posts/:id/comments/
- Response: Comment[]

POST /api/posts/:id/comments/
- Request: { content: string, replyTo?: number }
- Response: Comment
```

### Data Models

```typescript
interface Post {
  id: number
  title: string
  content: string
  images: string[]
  tags: string[]
  location?: string
  author: {
    id: number
    name: string
    avatar: string
  }
  products?: {
    id: number
    title: string
    price: number
    image: string
  }[]
  stats: {
    likes: number
    comments: number
    favorites: number
  }
  createdAt: string
}

interface PostCreateData {
  title: string
  content: string
  images: string[]
  tags: string[]
  location?: string
  products?: number[] // Product IDs
}
```

## Orders

### Endpoints

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

### Data Models

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

## Search

### Endpoints

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

### Data Models

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

## Favorites

### Endpoints

```
GET /api/favorites/
- Response: { products: Product[], posts: Post[] }

POST /api/favorites/
- Request: { type: 'product' | 'post', id: number }
- Response: { success: true }

DELETE /api/favorites/:type/:id/
- Response: { success: true }
```

## Notifications

### Endpoints

```
GET /api/notifications/
- Query params: { page?: number }
- Response: { items: Notification[], hasMore: boolean, nextPage?: number }

POST /api/notifications/read/
- Request: { ids: number[] }
- Response: { success: true }

GET /api/notifications/unread-count/
- Response: { count: number }
```

### Data Models

```typescript
interface Notification {
  id: number
  type: 'like' | 'comment' | 'follow' | 'system'
  content: string
  targetId?: number
  targetType?: 'post' | 'comment'
  actor?: {
    id: number
    name: string
    avatar: string
  }
  isRead: boolean
  createdAt: string
}
```

## Addresses

### Endpoints

```
GET /api/addresses/
- Response: Address[]

POST /api/addresses/
- Request: AddressCreateData
- Response: Address

PATCH /api/addresses/:id/
- Request: Partial<AddressCreateData>
- Response: Address

DELETE /api/addresses/:id/
- Response: { success: true }

POST /api/addresses/:id/default/
- Response: { success: true }
```

### Data Models

```typescript
interface Address {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

interface AddressCreateData {
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault?: boolean
}
```