import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Keyword {
  id: number
  keyword: string
  searchCount: number
  type: string
  trend: string
}

interface KeywordState {
  keywords: Keyword[]
  loading: boolean
  error: string | null
}

const initialState: KeywordState = {
  keywords: [
    { id: 1, keyword: "东京", searchCount: 1234, type: "destination", trend: "+12%" },
    { id: 2, keyword: "京都", searchCount: 890, type: "destination", trend: "+5%" },
    { id: 3, keyword: "大阪", searchCount: 756, type: "destination", trend: "-2%" }
  ],
  loading: false,
  error: null
}

export const keywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    addKeyword: (state, action: PayloadAction<Omit<Keyword, "id">>) => {
      state.keywords.push({
        id: Date.now(),
        ...action.payload
      })
    },
    deleteKeyword: (state, action: PayloadAction<number>) => {
      state.keywords = state.keywords.filter(keyword => keyword.id !== action.payload)
    }
  }
})

export const { setLoading, setError, addKeyword, deleteKeyword } = keywordSlice.actions
export default keywordSlice.reducer