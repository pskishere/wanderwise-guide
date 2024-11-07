import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id?: string;
  name: string;
  nickname: string;
  userId: string;
  bio: string;
  avatar: string;
  isAdmin: boolean;
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    }
  }
});

export const { setProfile, setLoading, setError, clearProfile } = userSlice.actions;
export default userSlice.reducer;