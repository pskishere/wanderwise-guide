import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoriteItem {
  id: number
  type: "post" | "product"
}

interface FavoriteState {
  items: FavoriteItem[]
}

const initialState: FavoriteState = {
  items: []
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      state.items.push(action.payload)
    },
    removeFavorite: (state, action: PayloadAction<{ id: number, type: "post" | "product" }>) => {
      state.items = state.items.filter(
        item => !(item.id === action.payload.id && item.type === action.payload.type)
      )
    }
  }
})

export const { addFavorite, removeFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer