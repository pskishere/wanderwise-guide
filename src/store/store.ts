import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import productReducer from './productSlice'
import postReducer from './postSlice'
import messageReducer from './messageSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    post: postReducer,
    message: messageReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch