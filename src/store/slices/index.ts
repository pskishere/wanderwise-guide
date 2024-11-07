import cartReducer, * as cartActions from './cartSlice';
import productReducer, * as productActions from './productSlice';
import postReducer, * as postActions from './postSlice';
import addressReducer, * as addressActions from './addressSlice';
import searchReducer, * as searchActions from './searchSlice';
import orderReducer, * as orderActions from './orderSlice';
import checkoutReducer, * as checkoutActions from './checkoutSlice';
import userReducer, * as userActions from './userSlice';
import createPostReducer, * as createPostActions from './createPostSlice';
import keywordReducer, * as keywordActions from './keywordSlice';
import commentReducer, * as commentActions from './commentSlice';
import notificationReducer, * as notificationActions from './notificationSlice';
import favoriteReducer, * as favoriteActions from './favoriteSlice';
import destinationReducer, * as destinationActions from './destinationSlice';

export {
  cartReducer,
  productReducer,
  postReducer,
  addressReducer,
  searchReducer,
  orderReducer,
  checkoutReducer,
  userReducer,
  createPostReducer,
  keywordReducer,
  commentReducer,
  notificationReducer,
  favoriteReducer,
  destinationReducer
};

// Export actions with namespaces to avoid conflicts
export {
  cartActions,
  productActions,
  postActions,
  addressActions,
  searchActions,
  orderActions,
  checkoutActions,
  userActions,
  createPostActions,
  keywordActions,
  commentActions,
  notificationActions,
  favoriteActions,
  destinationActions
};