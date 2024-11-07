import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Post } from '@/types/post'

interface PostDetailState {
  post: Post | null
  loading: boolean
  error: string | null
}

const initialState: PostDetailState = {
  post: null,
  loading: false,
  error: null
}

export const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload
    },
    updateLikes: (state, action: PayloadAction<number>) => {
      if (state.post) {
        state.post.stats.likes = action.payload
      }
    },
    updateFavorites: (state, action: PayloadAction<number>) => {
      if (state.post) {
        state.post.stats.favorites = action.payload
      }
    }
  }
})

export const { 
  setLoading, 
  setError, 
  setPost,
  updateLikes,
  updateFavorites
} = postDetailSlice.actions

export default postDetailSlice.reducer