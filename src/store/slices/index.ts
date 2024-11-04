import { cartSlice } from '../cartSlice'
import { productSlice } from '../productSlice'
import { postSlice } from '../postSlice'
import { messageSlice } from '../messageSlice'
import { addressSlice } from '../addressSlice'
import { searchSlice } from '../searchSlice'
import { orderSlice } from '../orderSlice'
import { checkoutSlice } from '../checkoutSlice'
import { userSlice } from '../userSlice'
import { createPostSlice } from '../createPostSlice'
import { keywordSlice } from '../keywordSlice'

export const cartReducer = cartSlice.reducer
export const productReducer = productSlice.reducer
export const postReducer = postSlice.reducer
export const messageReducer = messageSlice.reducer
export const addressReducer = addressSlice.reducer
export const searchReducer = searchSlice.reducer
export const orderReducer = orderSlice.reducer
export const checkoutReducer = checkoutSlice.reducer
export const userReducer = userSlice.reducer
export const createPostReducer = createPostSlice.reducer
export const keywordReducer = keywordSlice.reducer