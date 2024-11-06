# Redux Store Structure Documentation

This document outlines the Redux store structure and required API endpoints for the Django backend.

## Store Structure Overview

```typescript
interface RootState {
  cart: CartState
  product: ProductState
  post: PostState
  address: AddressState
  search: SearchState
  order: OrderState
  checkout: CheckoutState
  user: UserState
  createPost: CreatePostState
  keyword: KeywordState
  comment: CommentState
  notification: NotificationState
  favorite: FavoriteState
  destination: DestinationState
}
```

## Required API Endpoints

### User Management
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

### Products
```
GET /api/products/
- Query params: { category?: string, cursor?: number, limit?: number }
- Response: { items: Product[], nextCursor?: number }

GET /api/products/:id/
- Response: Product
```

### Posts
```
GET /api/posts/
- Query params: { cursor?: number, limit?: number }
- Response: { items: Post[], nextCursor?: number }

POST /api/posts/
- Request: CreatePostState['draft']
- Response: Post

GET /api/posts/:id/
- Response: Post

POST /api/posts/:id/comments/
- Request: { content: string }
- Response: Comment
```

### Orders
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

### Cart
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

### Address
```
GET /api/addresses/
- Response: Address[]

POST /api/addresses/
- Request: { name: string, phone: string, detail: string }
- Response: Address

PATCH /api/addresses/:id/
- Request: { name?: string, phone?: string, detail?: string, isDefault?: boolean }
- Response: Address

DELETE /api/addresses/:id/
- Response: { success: true }
```

### Search
```
GET /api/search/
- Query params: { q: string, type?: string }
- Response: SearchResult[]
```

### Favorites
```
GET /api/favorites/
- Response: { products: Product[], posts: Post[] }

POST /api/favorites/
- Request: { type: 'product' | 'post', id: number }
- Response: { success: true }

DELETE /api/favorites/:type/:id/
- Response: { success: true }
```

### Notifications
```
GET /api/notifications/
- Response: Notification[]

PATCH /api/notifications/:id/
- Request: { read: boolean }
- Response: Notification
```

## Data Models

### UserProfile
```typescript
interface UserProfile {
  nickname: string
  userId: string
  bio: string
  avatar: string
  name: string
  isAdmin: boolean
}
```

### Product
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

### Post
```typescript
interface Post {
  id: number
  title: string
  content: string
  image: string
  author: {
    name: string
    avatar: string
  }
  likes: number
  comments: number
  images?: string[]
  tags?: string[]
  location?: string
  products?: {
    id: number
    title: string
    price: string
    image: string
  }[]
}
```

### Order
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

### Address
```typescript
interface Address {
  id: string
  name: string
  phone: string
  detail: string
  isDefault: boolean
}
```

### Notification
```typescript
interface Notification {
  id: number
  type: string
  title: string
  content: string
  time: string
  read: boolean
  link?: string
}
```

### SearchResult
```typescript
interface SearchResult {
  id: number
  type: 'product' | 'post'
  title: string
  image: string
  description?: string
  price?: number
  author?: {
    name: string
    avatar: string
  }
}
```

## Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Responses

All API endpoints should return appropriate HTTP status codes and error messages in the following format:

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