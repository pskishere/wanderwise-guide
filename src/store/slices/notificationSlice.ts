import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow';
  content: string;
  time: string;
  isRead: boolean;
  avatar: string;
}

interface NotificationState {
  notifications: Notification[];
  hasMore: boolean;
  page: number;
  loading: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  hasMore: true,
  page: 1,
  loading: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = [...state.notifications, ...action.payload];
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.isRead = true;
      });
    },
    clearAll: (state) => {
      state.notifications = [];
      state.hasMore = false;
    },
  },
});

export const {
  setNotifications,
  setHasMore,
  setPage,
  setLoading,
  markAsRead,
  markAllAsRead,
  clearAll,
} = notificationSlice.actions;

export default notificationSlice.reducer;