import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncState } from './types';

export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
}

interface PostState extends AsyncState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    updateLikes: (state, action: PayloadAction<{ id: number; likes: number }>) => {
      const post = state.posts.find(post => post.id === action.payload.id);
      if (post) {
        post.likes = action.payload.likes;
      }
    },
    addComment: (state, action: PayloadAction<any>) => {
      // Implementation for adding comments
    },
    addReply: (state, action: PayloadAction<any>) => {
      // Implementation for adding replies
    }
  }
});

export const {
  setLoading,
  setError,
  setPosts,
  updateLikes,
  addComment,
  addReply
} = postSlice.actions;

export default postSlice.reducer;