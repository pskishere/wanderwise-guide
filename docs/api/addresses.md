# Addresses API

## Endpoints

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

## Data Models

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