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

// Actions from productSlice
export {
  setLoading as setProductLoading,
  setError as setProductError,
  setProducts,
  appendProducts,
  setCurrentPage,
  setHasMore as setProductHasMore,
  filterByCategory
} from './productSlice';

// Actions from postSlice
export {
  setLoading as setPostLoading,
  setError as setPostError,
  setPosts,
  updateLikes as updatePostLikes,
  addComment,
  addReply
} from './postSlice';

// Actions from addressSlice
export {
  setLoading as setAddressLoading,
  setError as setAddressError,
  addAddress,
  updateAddress,
  deleteAddress
} from './addressSlice';

// Actions from searchSlice
export {
  setLoading as setSearchLoading,
  setError as setSearchError,
  setResults
} from './searchSlice';

// Actions from orderSlice
export {
  setLoading as setOrderLoading,
  setError as setOrderError,
  setCurrentOrder,
  updateOrderStatus
} from './orderSlice';

// Actions from checkoutSlice
export {
  setLoading as setCheckoutLoading,
  setError as setCheckoutError,
  setSelectedItems,
  setSelectedAddress,
  setPaymentMethod
} from './checkoutSlice';

// Actions from userSlice
export {
  setLoading as setUserLoading,
  setError as setUserError,
  setProfile,
  setUser
} from './userSlice';

// Actions from createPostSlice
export {
  setLoading as setCreatePostLoading,
  setError as setCreatePostError,
  setDraft,
  addImage,
  removeImage,
  toggleTag,
  clearDraft
} from './createPostSlice';

// Actions from notificationSlice
export {
  setLoading as setNotificationLoading,
  setError as setNotificationError,
  setNotifications,
  setHasMore as setNotificationHasMore,
  setPage,
  markAsRead,
  markAllAsRead,
  clearAll
} from './notificationSlice';