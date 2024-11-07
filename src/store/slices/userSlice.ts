import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockUsers } from '../mocks';

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
  profile: mockUsers[0],
  user: mockUsers[0],
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