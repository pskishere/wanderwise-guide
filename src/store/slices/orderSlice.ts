import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  specs?: string[];
}

export interface Order {
  id: string;
  status: string;
  totalAmount: number;
  freight: number;
  address?: {
    name: string;
    phone: string;
    detail: string;
    fullAddress?: string;
  };
  timeline: {
    time: string;
    status: string;
  }[];
  items: OrderItem[];
}

interface OrderState {
  currentOrder: Order | null;
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  orders: [],
  loading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    updateOrderStatus: (state, action: PayloadAction<string>) => {
      if (state.currentOrder) {
        state.currentOrder.status = action.payload;
        state.currentOrder.timeline.push({
          time: new Date().toISOString(),
          status: `订单${action.payload}`
        });
      }
    }
  }
});

export const {
  setLoading,
  setError,
  setCurrentOrder,
  updateOrderStatus
} = orderSlice.actions;

export default orderSlice.reducer;