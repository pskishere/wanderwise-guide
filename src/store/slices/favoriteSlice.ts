import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/types/post';
import { Product } from '@/types/product';

interface FavoriteState {
  posts: Post[];
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  posts: [],
  products: [],
  loading: false,
  error: null
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    clearAll: (state) => {
      state.posts = [];
      state.products = [];
    }
  }
});

export const {
  setLoading,
  setError,
  setPosts,
  setProducts,
  addPost,
  addProduct,
  removePost,
  removeProduct,
  clearAll
} = favoriteSlice.actions;

export default favoriteSlice.reducer;