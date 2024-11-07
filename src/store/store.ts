import { configureStore } from '@reduxjs/toolkit'
import * as reducers from './slices'

export const store = configureStore({
  reducer: {
    cart: reducers.cartReducer,
    product: reducers.productReducer,
    post: reducers.postReducer,
    address: reducers.addressReducer,
    search: reducers.searchReducer,
    order: reducers.orderReducer,
    checkout: reducers.checkoutReducer,
    createPost: reducers.createPostReducer,
    user: reducers.userReducer,
    comment: reducers.commentReducer,
    notification: reducers.notificationReducer,
    favorite: reducers.favoriteReducer,
    destination: reducers.destinationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch