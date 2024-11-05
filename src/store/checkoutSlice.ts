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
  paymentMethod: 'alipay' | 'wechat' | '';
  loading: boolean;
  error: string | null;
}

const initialState: CheckoutState = {
  selectedItems: [],
  selectedAddress: null,
  paymentMethod: '',
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
    clearCheckout: (state) => {
      state.selectedItems = [];
      state.selectedAddress = null;
      state.paymentMethod = '';
    }
  }
});

export const {
  setSelectedItems,
  setSelectedAddress,
  setPaymentMethod,
  clearCheckout
} = checkoutSlice.actions;

export default checkoutSlice.reducer;