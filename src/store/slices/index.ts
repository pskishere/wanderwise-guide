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

// Export all actions from each slice
export {
  setLoading as setProductLoading,
  setError as setProductError,
  setProducts,
  appendProducts,
  setCurrentPage,
  setHasMore
} from './productSlice';

export {
  setLoading as setPostLoading,
  setError as setPostError,
  setPosts,
  updateLikes
} from './postSlice';

export {
  setLoading as setAddressLoading,
  setError as setAddressError,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from './addressSlice';

export {
  setLoading as setSearchLoading,
  setError as setSearchError,
  setResults
} from './searchSlice';

export {
  setLoading as setOrderLoading,
  setError as setOrderError,
  setCurrentOrder,
  updateOrderStatus
} from './orderSlice';

export {
  setLoading as setCheckoutLoading,
  setError as setCheckoutError,
  setSelectedItems,
  setSelectedAddress,
  setPaymentMethod
} from './checkoutSlice';

export {
  setLoading as setUserLoading,
  setError as setUserError,
  setProfile,
  setUser
} from './userSlice';

export {
  setLoading as setCreatePostLoading,
  setDraft,
  addImage,
  removeImage,
  toggleTag,
  clearDraft
} from './createPostSlice';

export {
  setNotifications,
  setHasMore as setNotificationHasMore,
  setPage,
  markAsRead,
  markAllAsRead,
  clearAll
} from './notificationSlice';

export {
  setCartLoading,
  setCartError,
  setItems,
  toggleSelectAll,
  toggleSelectItem,
  updateQuantity,
  removeItem
} from './cartSlice';