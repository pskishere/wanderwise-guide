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
  address: {
    name: string;
    phone: string;
    detail: string;
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
  orders: [
    {
      id: "ORD001",
      status: "待收货",
      totalAmount: 299,
      freight: 0,
      address: {
        name: "张三",
        phone: "138****8888",
        detail: "浙江省杭州市西湖区文三路 123 号"
      },
      timeline: [
        {
          time: "2024-02-20 14:30:00",
          status: "订单创建成功"
        },
        {
          time: "2024-02-20 14:35:00",
          status: "支付成功"
        }
      ],
      items: [
        {
          id: 1,
          title: "日本限定 Hello Kitty 樱花限定版玩偶",
          price: 299,
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
          quantity: 1,
          specs: ["粉色 40cm"]
        }
      ]
    }
  ],
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

export const { setLoading, setError, setCurrentOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;