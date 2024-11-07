import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncState } from '../types';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  shop: string;
  selected: boolean;
  specs?: string[];
  discount?: number;
  deadline?: string;
}

interface CartState extends AsyncState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCartError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    toggleSelectAll: (state, action: PayloadAction<boolean>) => {
      state.items = state.items.map(item => ({
        ...item,
        selected: action.payload
      }));
    },
    toggleSelectItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.selected = !item.selected;
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const {
  setCartLoading,
  setCartError,
  setItems,
  toggleSelectAll,
  toggleSelectItem,
  updateQuantity,
  removeItem
} = cartSlice.actions;

export default cartSlice.reducer;