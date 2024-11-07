import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import postReducer from './postSlice';
import addressReducer from './addressSlice';
import searchReducer from './searchSlice';
import orderReducer from './orderSlice';
import checkoutReducer from './checkoutSlice';
import userReducer from './userSlice';
import createPostReducer from './createPostSlice';
import keywordReducer from './keywordSlice';
import commentReducer from './commentSlice';
import notificationReducer from './notificationSlice';
import favoriteReducer from './favoriteSlice';
import destinationReducer from './destinationSlice';
import postDetailReducer from './postDetailSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  post: postReducer,
  postDetail: postDetailReducer,
  address: addressReducer,
  search: searchReducer,
  order: orderReducer,
  checkout: checkoutReducer,
  user: userReducer,
  createPost: createPostReducer,
  keyword: keywordReducer,
  comment: commentReducer,
  notification: notificationReducer,
  favorite: favoriteReducer,
  destination: destinationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
