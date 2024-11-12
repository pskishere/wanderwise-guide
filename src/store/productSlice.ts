import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';
import { mockProducts } from '@/services/mockData';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 0,
  hasMore: true
};

export const productSlice = createSlice({
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
      const category = action.payload;
      if (category === 'all') {
        state.products = mockProducts;
      } else {
        state.products = mockProducts.filter(product => 
          product.tags.some(tag => tag.includes(category)) ||
          product.title.includes(category)
        );
      }
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