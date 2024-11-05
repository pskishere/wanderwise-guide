import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

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
  selectedAddress: {
    id: "1",
    name: "张三",
    phone: "138****8888",
    detail: "浙江省杭州市西湖区文三路 123 号"
  },
  paymentMethod: 'alipay',
  loading: false,
  error: null
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setSelectedItems: (state, action: PayloadAction<CartItem[]>) => {
      state.selectedItems = action.payload;
    },
    setSelectedAddress: (state, action: PayloadAction<CheckoutState['selectedAddress']>) => {
      state.selectedAddress = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<'alipay' | 'wechat'>) => {
      state.paymentMethod = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setSelectedItems,
  setSelectedAddress,
  setPaymentMethod,
  setLoading,
  setError
} = checkoutSlice.actions;

export default checkoutSlice.reducer;