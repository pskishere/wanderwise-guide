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

// Actions
export {
  setCartLoading,
  setCartError,
  setItems,
  toggleSelectAll,
  toggleSelectItem,
  updateQuantity,
  removeItem
} from './cartSlice';

export {
  setProductLoading,
  setProductError,
  setProducts,
  appendProducts,
  setCurrentPage,
  setProductHasMore,
  filterByCategory
} from './productSlice';

export {
  setPostLoading,
  setPostError,
  setPosts,
  updatePostLikes,
  addComment,
  addReply
} from './postSlice';

export {
  setAddressLoading,
  setAddressError,
  addAddress,
  updateAddress,
  deleteAddress
} from './addressSlice';

export {
  setSearchLoading,
  setSearchError,
  setResults
} from './searchSlice';

export {
  setOrderLoading,
  setOrderError,
  setCurrentOrder,
  updateOrderStatus
} from './orderSlice';

export {
  setCheckoutLoading,
  setCheckoutError,
  setSelectedItems,
  setSelectedAddress,
  setPaymentMethod
} from './checkoutSlice';

export {
  setUserLoading,
  setUserError,
  setProfile,
  setUser
} from './userSlice';

export {
  setCreatePostLoading,
  setCreatePostError,
  setDraft,
  addImage,
  removeImage,
  toggleTag,
  clearDraft
} from './createPostSlice';

export {
  setNotificationLoading,
  setNotificationError,
  setNotifications,
  setNotificationHasMore,
  setPage,
  markAsRead,
  markAllAsRead,
  clearAll
} from './notificationSlice';