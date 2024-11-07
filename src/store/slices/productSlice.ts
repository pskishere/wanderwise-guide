import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types/product'

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  currentPage: number
  hasMore: boolean
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMore: true
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload
    }
  }
})

export const { setProducts, setLoading, setError, setCurrentPage, setHasMore } = productSlice.actions
export default productSlice.reducer