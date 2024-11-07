import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Post } from '@/types/post'

interface PostDetailState {
  post: Post | null
  loading: boolean
  error: string | null
  mockPosts: Post[]
}

const initialState: PostDetailState = {
  post: null,
  loading: false,
  error: null,
  mockPosts: [
    {
      id: 1,
      title: "京都和服体验｜超详细攻略，体验最正宗的日本文化",
      content: "今天给大家分享一下京都和服体验！和服体验是来日本旅游必打卡的项目之一，可以说是来日本旅游的必备体验。今天我就给大家详细介绍一下在京都体验和服的全过程，包括选择店铺、预约方式、价格、穿着过程等等...",
      images: [
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", 
        "https://images.unsplash.com/photo-1493997181344-712f2f19d87a?w=800&q=80",
        "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80"
      ],
      author: {
        id: 1,
        name: "樱花妹",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
      },
      stats: {
        likes: 3421,
        comments: 234,
        favorites: 156
      },
      tags: ["旅行", "日本", "京都", "和服"],
      createdAt: "2024-02-20"
    }
  ]
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
    },
    addMockPost: (state, action: PayloadAction<Post>) => {
      state.mockPosts.unshift(action.payload)
    }
  }
})

export const { 
  setLoading, 
  setError, 
  setPost,
  updateLikes,
  updateFavorites,
  addMockPost
} = postDetailSlice.actions

export default postDetailSlice.reducer