# Redux API

This document outlines the Redux store structure and the main slices used in the application.

## Store Overview

The application uses Redux for state management with the following main slices:

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

## Slices

### Cart Slice

```typescript
interface CartState {
  items: CartItem[]
  loading: boolean
  error: string | null
}

// Actions
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
setItems(state, action: PayloadAction<CartItem[]>)
toggleSelectAll(state, action: PayloadAction<boolean>)
toggleSelectItem(state, action: PayloadAction<number>)
updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>)
removeItem(state, action: PayloadAction<number>)
```

### Product Slice

```typescript
interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
}

// Actions
setProducts(state, action: PayloadAction<Product[]>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
```

### Post Slice

```typescript
interface PostState {
  posts: Post[]
  loading: boolean
  error: string | null
}

// Actions
setPosts(state, action: PayloadAction<Post[]>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
```

### Address Slice

```typescript
interface AddressState {
  addresses: Address[]
  loading: boolean
  error: string | null
}

// Actions
setAddresses(state, action: PayloadAction<Address[]>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
addAddress(state, action: PayloadAction<Address>)
updateAddress(state, action: PayloadAction<Address>)
removeAddress(state, action: PayloadAction<string>)
```

### Search Slice

```typescript
interface SearchState {
  results: SearchResult
  loading: boolean
  error: string | null
}

// Actions
setResults(state, action: PayloadAction<SearchResult>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
```

### Order Slice

```typescript
interface OrderState {
  orders: Order[]
  loading: boolean
  error: string | null
}

// Actions
setOrders(state, action: PayloadAction<Order[]>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
addOrder(state, action: PayloadAction<Order>)
updateOrder(state, action: PayloadAction<Order>)
```

### Checkout Slice

```typescript
interface CheckoutState {
  items: CartItem[]
  address: Address | null
  paymentMethod: string | null
  loading: boolean
  error: string | null
}

// Actions
setItems(state, action: PayloadAction<CartItem[]>)
setAddress(state, action: PayloadAction<Address>)
setPaymentMethod(state, action: PayloadAction<string>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
```

### User Slice

```typescript
interface UserState {
  user: User | null
  loading: boolean
  error: string | null
}

// Actions
setUser(state, action: PayloadAction<User>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
logout(state)
```

### CreatePost Slice

```typescript
interface CreatePostState {
  title: string
  content: string
  images: string[]
  tags: string[]
  loading: boolean
  error: string | null
}

// Actions
setTitle(state, action: PayloadAction<string>)
setContent(state, action: PayloadAction<string>)
addImage(state, action: PayloadAction<string>)
removeImage(state, action: PayloadAction<string>)
setTags(state, action: PayloadAction<string[]>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
resetForm(state)
```

### Keyword Slice

```typescript
interface KeywordState {
  keywords: string[]
  loading: boolean
  error: string | null
}

// Actions
setKeywords(state, action: PayloadAction<string[]>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
addKeyword(state, action: PayloadAction<string>)
removeKeyword(state, action: PayloadAction<string>)
```

### Comment Slice

```typescript
interface CommentState {
  comments: Comment[]
  loading: boolean
  error: string | null
}

// Actions
setComments(state, action: PayloadAction<Comment[]>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
addComment(state, action: PayloadAction<Comment>)
updateComment(state, action: PayloadAction<Comment>)
removeComment(state, action: PayloadAction<number>)
```

### Notification Slice

```typescript
interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  error: string | null
}

// Actions
setNotifications(state, action: PayloadAction<Notification[]>)
setUnreadCount(state, action: PayloadAction<number>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
addNotification(state, action: PayloadAction<Notification>)
markAsRead(state, action: PayloadAction<number>)
markAllAsRead(state)
```

### Favorite Slice

```typescript
interface FavoriteState {
  favorites: Favorite[]
  loading: boolean
  error: string | null
}

// Actions
setFavorites(state, action: PayloadAction<Favorite[]>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
addFavorite(state, action: PayloadAction<Favorite>)
removeFavorite(state, action: PayloadAction<number>)
```

### Destination Slice

```typescript
interface DestinationState {
  destinations: Destination[]
  loading: boolean
  error: string | null
}

// Actions
setDestinations(state, action: PayloadAction<Destination[]>)
setLoading(state, action: PayloadAction<boolean>)
setError(state, action: PayloadAction<string | null>)
addDestination(state, action: PayloadAction<Destination>)
updateDestination(state, action: PayloadAction<Destination>)
removeDestination(state, action: PayloadAction<number>)
```