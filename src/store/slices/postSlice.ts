import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '@/types/post'

interface PostState {
  posts: Post[]
  loading: boolean
  error: string | null
  currentPost: Post | null
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  currentPost: null
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload
    },
    setCurrentPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

export const { setPosts, setCurrentPost, setLoading, setError } = postSlice.actions
export default postSlice.reducer