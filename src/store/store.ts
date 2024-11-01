import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import productReducer from './productSlice'
import postReducer from './postSlice'
import messageReducer from './messageSlice'
import addressReducer from './addressSlice'
import searchReducer from './searchSlice'
import orderReducer from './orderSlice'
import checkoutReducer from './checkoutSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    post: postReducer,
    message: messageReducer,
    address: addressReducer,
    search: searchReducer,
    order: orderReducer,
    checkout: checkoutReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch