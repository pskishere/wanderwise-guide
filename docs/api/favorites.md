# Favorites API

## Endpoints

```
GET /api/favorites/
- Response: { products: Product[], posts: Post[] }

POST /api/favorites/
- Request: { type: 'product' | 'post', id: number }
- Response: { success: true }

DELETE /api/favorites/:type/:id/
- Response: { success: true }
```