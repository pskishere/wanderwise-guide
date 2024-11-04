import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Post {
  id: number
  title: string
  content: string
  image: string
  author: {
    name: string
    avatar: string
  }
  likes: number
  comments: number
}

interface PostState {
  posts: Post[]
  loading: boolean
  error: string | null
}

const titles = [
  "东京和服体验｜超详细攻略",
  "京都赏樱一日游记，感受春日浪漫",
  "大阪美食地图｜带你吃遍关西必打卡的美食",
  "北海道温泉之旅",
  "富士山下的春日物语｜河口湖一日游完全攻略"
]

const initialState: PostState = {
  posts: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: titles[Math.floor(Math.random() * titles.length)],
    content: "这是一段旅行日记的内容描述...",
    image: `https://picsum.photos/seed/${i + 1}/400/600`,
    author: {
      name: "旅行者",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
    },
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100)
  })),
  loading: false,
  error: null
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload)
    },
    updateLikes: (state, action: PayloadAction<{ id: number, likes: number }>) => {
      const post = state.posts.find(post => post.id === action.payload.id)
      if (post) {
        post.likes = action.payload.likes
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload)
    }
  }
})

export const { 
  setLoading, 
  setError, 
  setPosts, 
  addPost, 
  updateLikes,
  deletePost
} = postSlice.actions

export default postSlice.reducer