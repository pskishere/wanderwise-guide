import { configureStore } from '@reduxjs/toolkit'
import {
  cartReducer,
  productReducer,
  postReducer,
  addressReducer,
  searchReducer,
  orderReducer,
  checkoutReducer,
  createPostReducer,
  userReducer
} from './slices'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    post: postReducer,
    address: addressReducer,
    search: searchReducer,
    order: orderReducer,
    checkout: checkoutReducer,
    createPost: createPostReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch