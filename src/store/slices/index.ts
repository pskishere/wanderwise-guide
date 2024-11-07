// Reducers
export { default as cartReducer } from './cartSlice';
export { default as productReducer } from './productSlice';
export { default as postReducer } from './postSlice';
export { default as addressReducer } from './addressSlice';
export { default as searchReducer } from './searchSlice';
export { default as orderReducer } from './orderSlice';
export { default as checkoutReducer } from './checkoutSlice';
export { default as userReducer } from './userSlice';
export { default as createPostReducer } from './createPostSlice';
export { default as keywordReducer } from './keywordSlice';
export { default as commentReducer } from './commentSlice';
export { default as notificationReducer } from './notificationSlice';
export { default as favoriteReducer } from './favoriteSlice';
export { default as destinationReducer } from './destinationSlice';

// Re-export all actions and types from slices
export * from './cartSlice';
export * from './productSlice';
export * from './postSlice';
export * from './addressSlice';
export * from './searchSlice';
export * from './orderSlice';
export * from './checkoutSlice';
export * from './userSlice';
export * from './createPostSlice';
export * from './keywordSlice';
export * from './commentSlice';
export * from './notificationSlice';
export * from './favoriteSlice';
export * from './destinationSlice';

// Namespace common actions to avoid conflicts
export {
  setLoading as setProductLoading,
  setError as setProductError
} from './productSlice';

export {
  setLoading as setOrderLoading,
  setError as setOrderError
} from './orderSlice';

export {
  setLoading as setUserLoading,
  setError as setUserError
} from './userSlice';