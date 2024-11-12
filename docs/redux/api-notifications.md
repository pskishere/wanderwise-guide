# Notifications API Documentation

## Endpoints

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

## Data Models

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