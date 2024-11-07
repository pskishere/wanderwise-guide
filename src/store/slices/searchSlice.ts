import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SearchResult } from '@/types/search';

interface SearchState {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    }
  }
});

export const { setLoading, setError, setResults } = searchSlice.actions;
export default searchSlice.reducer;