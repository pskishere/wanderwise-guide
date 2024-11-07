# Redux Store Overview

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

Each slice manages a specific domain of the application state. See individual documentation files for details on each slice.