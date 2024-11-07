import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: number
  title: string
  price: string
  image: string
}

interface CreatePostState {
  draft: {
    title: string
    content: string
    images: string[]
    tags: string[]
    location: string
    products?: Product[]
  }
  loading: boolean
  mockPosts: Post[]
}

interface Post {
  id: number
  title: string
  content: string
  images: string[]
  tags: string[]
  location?: string
  author: {
    id: number
    name: string
    avatar: string
  }
  products?: Product[]
  stats: {
    likes: number
    comments: number
    favorites: number
  }
  createdAt: string
}

const initialState: CreatePostState = {
  draft: {
    title: '',
    content: '',
    images: [],
    tags: [],
    location: '',
    products: []
  },
  loading: false,
  mockPosts: [
    {
      id: 1,
      title: "日本东京之旅",
      content: "这是一段美好的旅行回忆...",
      images: ["https://picsum.photos/seed/1/400/600"],
      tags: ["旅行", "日本", "东京"],
      location: "东京都新宿区",
      author: {
        id: 1,
        name: "旅行者",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
      },
      stats: {
        likes: 888,
        comments: 66,
        favorites: 233
      },
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "京都和服体验",
      content: "穿和服逛清水寺...",
      images: ["https://picsum.photos/seed/2/400/600"],
      tags: ["旅行", "日本", "京都", "和服"],
      location: "京都府京都市",
      author: {
        id: 1,
        name: "旅行者",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
      },
      stats: {
        likes: 666,
        comments: 45,
        favorites: 178
      },
      createdAt: new Date().toISOString()
    }
  ]
}

export const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    setDraft: (state, action: PayloadAction<Partial<CreatePostState['draft']>>) => {
      state.draft = { ...state.draft, ...action.payload }
    },
    addImage: (state, action: PayloadAction<string>) => {
      state.draft.images.push(action.payload)
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.draft.images.splice(action.payload, 1)
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const index = state.draft.tags.indexOf(action.payload)
      if (index === -1) {
        state.draft.tags.push(action.payload)
      } else {
        state.draft.tags.splice(index, 1)
      }
    },
    clearDraft: (state) => {
      state.draft = initialState.draft
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    addMockPost: (state, action: PayloadAction<Post>) => {
      state.mockPosts.unshift(action.payload)
    }
  }
})

export const { 
  setDraft, 
  addImage, 
  removeImage, 
  toggleTag,
  clearDraft,
  setLoading,
  addMockPost
} = createPostSlice.actions

export default createPostSlice.reducer