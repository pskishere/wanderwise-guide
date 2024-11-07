# API Documentation

This documentation covers all available API endpoints and their usage.

## Table of Contents
- [Authentication](./auth.md)
- [Cart](./cart.md)
- [Products](./products.md)
- [Posts](./posts.md)
- [Orders](./orders.md)
- [Search](./search.md)
- [Favorites](./favorites.md)
- [Notifications](./notifications.md)
- [Addresses](./addresses.md)
- [Redux Store](./redux.md)

## Common Error Responses

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