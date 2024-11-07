import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { SearchResult } from '@/types/search'

interface SearchState {
  results: SearchResult[]
  loading: boolean
  error: string | null
  mockResults: SearchResult[]
}

const mockResults: SearchResult[] = [
  {
    id: 1,
    type: 'post',
    title: '东京和服体验｜超详细攻略',
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80",
    author: {
      name: "旅行达人",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
    },
    likes: 234,
    comments: 45
  },
  {
    id: 2,
    type: 'product',
    title: '日本特产礼盒',
    price: "¥299",
    sales: "2.3k",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    shop: "特产官方旗舰店",
    tags: ["伴手礼", "礼盒"]
  },
  {
    id: 3,
    type: 'post',
    title: '京都赏樱一日游记，感受春日浪漫',
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    author: {
      name: "摄影师小王",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&q=80"
    },
    likes: 456,
    comments: 89
  }
]

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
  mockResults
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload
    },
    filterResults: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase()
      state.results = state.mockResults.filter(result => 
        result.title.toLowerCase().includes(query)
      )
    }
  }
})

export const { setLoading, setError, setResults, filterResults } = searchSlice.actions
export default searchSlice.reducer