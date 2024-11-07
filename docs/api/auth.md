# Authentication API

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

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

## Error Responses

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