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

// Types and actions from each slice
export type { CartItem } from './cartSlice';
export { setItems, toggleSelectAll, toggleSelectItem, updateQuantity, removeItem } from './cartSlice';

export type { Product } from './productSlice';
export { setProducts, appendProducts, filterByCategory } from './productSlice';

export type { Post } from './postSlice';
export { setPosts, addPost, deletePost } from './postSlice';

export type { Address } from './addressSlice';
export { addAddress, updateAddress, deleteAddress, setDefaultAddress } from './addressSlice';

export type { SearchResult } from './searchSlice';
export { setResults } from './searchSlice';

export type { Order } from './orderSlice';
export { setCurrentOrder, updateOrderStatus } from './orderSlice';

export type { CheckoutState } from './checkoutSlice';
export { setSelectedItems, setSelectedAddress, setPaymentMethod } from './checkoutSlice';

export type { UserProfile } from './userSlice';
export { setProfile, setUser } from './userSlice';

export { setDraft, addImage, removeImage, toggleTag, clearDraft } from './createPostSlice';

export type { Comment } from './commentSlice';
export { addComment, addReply, updateLikes } from './commentSlice';

export type { Notification } from './notificationSlice';
export { setNotifications, markAsRead, markAllAsRead, clearAll } from './notificationSlice';

export type { Destination } from './destinationSlice';
export { setDestinations } from './destinationSlice';

// Common actions that are used across multiple slices
// We'll namespace them to avoid conflicts
export { setLoading as setProductLoading, setError as setProductError } from './productSlice';
export { setLoading as setOrderLoading, setError as setOrderError } from './orderSlice';
export { setLoading as setUserLoading, setError as setUserError } from './userSlice';