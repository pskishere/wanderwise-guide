# Posts API

## Endpoints

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

## Data Models

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