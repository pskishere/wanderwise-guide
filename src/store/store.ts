import { configureStore } from '@reduxjs/toolkit'
import * as reducers from './slices'

export const store = configureStore({
  reducer: {
    cart: reducers.cartReducer,
    product: reducers.productReducer,
    post: reducers.postReducer,
    message: reducers.messageReducer,
    address: reducers.addressReducer,
    search: reducers.searchReducer,
    order: reducers.orderReducer,
    checkout: reducers.checkoutReducer,
    user: reducers.userReducer,
    createPost: reducers.createPostReducer,
    keyword: reducers.keywordReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch