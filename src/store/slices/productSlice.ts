import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncState } from '../types';
import { Product } from '@/types/product';

interface ProductState extends AsyncState {
  products: Product[];
  currentPage: number;
  hasMore: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMore: true
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    appendProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = [...state.products, ...action.payload];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      // Implementation for filtering by category
    }
  }
});

export const {
  setLoading,
  setError,
  setProducts,
  appendProducts,
  setCurrentPage,
  setHasMore,
  filterByCategory
} = productSlice.actions;

export default productSlice.reducer;