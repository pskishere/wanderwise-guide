import { configureStore } from '@reduxjs/toolkit';
import * as reducers from './slices';

export const store = configureStore({
  reducer: {
    cart: reducers.cartReducer,
    product: reducers.productReducer,
    post: reducers.postReducer,
    address: reducers.addressReducer,
    search: reducers.searchReducer,
    order: reducers.orderReducer,
    checkout: reducers.checkoutReducer,
    user: reducers.userReducer,
    createPost: reducers.createPostReducer,
    keyword: reducers.keywordReducer,
    comment: reducers.commentReducer,
    notification: reducers.notificationReducer,
    favorite: reducers.favoriteReducer,
    destination: reducers.destinationReducer
  }
});

export type { RootState, AppDispatch } from './types';