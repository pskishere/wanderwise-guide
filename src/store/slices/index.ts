export { default as cartReducer } from './cartSlice';
export { default as productReducer } from './productSlice';
export { default as postReducer } from './postSlice';
export { default as addressReducer } from './addressSlice';
export { default as searchReducer } from './searchSlice';
export { default as orderReducer } from './orderSlice';
export { default as checkoutReducer } from './checkoutSlice';
export { default as createPostReducer } from './createPostSlice';

// Export actions
export {
  setLoading as setProductLoading,
  setError as setProductError,
  setProducts,
  appendProducts,
  setCurrentPage,
  setHasMore,
  filterByCategory
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
  deleteAddress
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
  setLoading as setCreatePostLoading,
  setDraft,
  addImage,
  removeImage,
  toggleTag,
  clearDraft
} from './createPostSlice';

export {
  setItems,
  toggleSelectAll,
  toggleSelectItem,
  updateQuantity,
  removeItem
} from './cartSlice';