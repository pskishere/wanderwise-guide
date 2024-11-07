import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  nickname: string;
  userId: string;
  bio: string;
  avatar: string;
  name: string;
  isAdmin: boolean;
}

export interface UserState {
  profile: UserProfile | null;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: {
    nickname: "旅行达人",
    userId: "XHSUID8888",
    bio: "在路上，寻找生活的诗意 ✨ 记录旅行的点点滴滴",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80",
    name: "管理员",
    isAdmin: true
  },
  user: {
    nickname: "旅行达人",
    userId: "XHSUID8888",
    bio: "在路上，寻找生活的诗意 ✨ 记录旅行的点点滴滴",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80",
    name: "管理员",
    isAdmin: true
  },
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setProfile, setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;