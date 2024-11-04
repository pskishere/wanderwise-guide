import { configureStore } from '@reduxjs/toolkit'
import * as slices from './slices'

export const store = configureStore({
  reducer: {
    cart: slices.cartReducer,
    product: slices.productReducer,
    post: slices.postReducer,
    message: slices.messageReducer,
    address: slices.addressReducer,
    search: slices.searchReducer,
    order: slices.orderReducer,
    checkout: slices.checkoutReducer,
    user: slices.userReducer,
    createPost: slices.createPostReducer,
    keyword: slices.keywordReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch