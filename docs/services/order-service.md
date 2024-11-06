# Order Service Documentation

## Overview
The Order Service handles all order-related operations including fetching orders, filtering by status, and pagination.

## API Reference

### fetchOrders
Fetches paginated orders with optional status filtering.

```typescript
interface FetchOrdersParams {
  pageParam?: number;  // Default: 1
  status?: string;     // Default: "all"
  limit?: number;      // Default: 5
}

interface OrderResponse {
  orders: Order[];
  nextPage?: number;
  hasMore: boolean;
  statusCounts: Record<string, number>;
}

const response = await fetchOrders({ 
  pageParam: 1, 
  status: "pending" 
});
```

#### Parameters
- `pageParam`: Page number for pagination (starts at 1)
- `status`: Filter orders by status ("all", "pending", "processing", "shipped", "completed", "cancelled")
- `limit`: Number of orders per page

#### Response
- `orders`: Array of order objects
- `nextPage`: Next page number if available
- `hasMore`: Boolean indicating if more orders exist
- `statusCounts`: Count of orders by status

## Order Statuses
- 待付款 (Pending Payment)
- 待发货 (Processing)
- 待收货 (Shipped)
- 已完成 (Completed)
- 已取消 (Cancelled)

## Error Handling
The service includes basic error handling and will throw an error if the fetch operation fails.

## Usage Example
```typescript
import { fetchOrders } from '@/services/orderService';

try {
  const { orders, hasMore } = await fetchOrders({ 
    pageParam: 1,
    status: "pending" 
  });
  // Handle orders
} catch (error) {
  // Handle error
}
```