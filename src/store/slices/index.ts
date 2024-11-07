import cartReducer, * as cartActions from './cartSlice'
import productReducer, * as productActions from './productSlice'
import postReducer, * as postActions from './postSlice'
import addressReducer, * as addressActions from './addressSlice'
import searchReducer, * as searchActions from './searchSlice'
import orderReducer, * as orderActions from './orderSlice'
import checkoutReducer, * as checkoutActions from './checkoutSlice'
import createPostReducer, * as createPostActions from './createPostSlice'
import userReducer, * as userActions from './userSlice'
import commentReducer from './commentSlice'
import notificationReducer from './notificationSlice'
import destinationReducer from './destinationSlice'

export {
  cartReducer,
  productReducer,
  postReducer,
  addressReducer,
  searchReducer,
  orderReducer,
  checkoutReducer,
  createPostReducer,
  userReducer,
  commentReducer,
  notificationReducer,
  destinationReducer
}

// Export individual action creators
export {
  cartActions,
  productActions,
  postActions,
  addressActions,
  searchActions,
  orderActions,
  checkoutActions,
  createPostActions,
  userActions
}