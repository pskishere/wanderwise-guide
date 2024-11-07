import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockUsers, mockFollowers, mockFollowing } from '../mocks';

export interface UserProfile {
  nickname: string;
  userId: string;
  bio: string;
  avatar: string;
  name: string;
  isAdmin: boolean;
}

export interface FollowUser {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  isFollowing: boolean;
}

export interface UserState {
  profile: UserProfile | null;
  user: UserProfile | null;
  followers: FollowUser[];
  following: FollowUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: mockUsers[0],
  user: mockUsers[0],
  followers: mockFollowers,
  following: mockFollowing,
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
    setFollowers: (state, action: PayloadAction<FollowUser[]>) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action: PayloadAction<FollowUser[]>) => {
      state.following = action.payload;
    },
    toggleFollow: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      state.following = state.following.map(user => 
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      );
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
  setProfile, 
  setUser, 
  setFollowers, 
  setFollowing,
  toggleFollow, 
  setLoading, 
  setError 
} = userSlice.actions;

export default userSlice.reducer;