import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from './cartSlice';

export interface CheckoutState {
  selectedItems: CartItem[];
  selectedAddress: {
    id: string;
    name: string;
    phone: string;
    detail: string;
  } | null;
  paymentMethod: 'alipay' | 'wechat';
  loading: boolean;
  error: string | null;
}

const initialState: CheckoutState = {
  selectedItems: [],
  selectedAddress: null,
  paymentMethod: 'alipay',
  loading: false,
  error: null
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSelectedItems: (state, action: PayloadAction<CartItem[]>) => {
      state.selectedItems = action.payload;
    },
    setSelectedAddress: (state, action: PayloadAction<CheckoutState['selectedAddress']>) => {
      state.selectedAddress = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<'alipay' | 'wechat'>) => {
      state.paymentMethod = action.payload;
    }
  }
});

export const {
  setLoading,
  setError,
  setSelectedItems,
  setSelectedAddress,
  setPaymentMethod
} = checkoutSlice.actions;

export default checkoutSlice.reducer;