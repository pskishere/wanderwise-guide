import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Destination {
  id: number;
  name: string;
  image: string;
}

interface DestinationState {
  destinations: Destination[];
  loading: boolean;
  error: string | null;
}

const initialState: DestinationState = {
  destinations: [
    { id: 1, name: "东京", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&q=80" },
    { id: 2, name: "巴厘岛", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&h=200&q=80" },
    { id: 3, name: "巴黎", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&h=200&q=80" },
  ],
  loading: false,
  error: null
};

export const destinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {
    setDestinations: (state, action: PayloadAction<Destination[]>) => {
      state.destinations = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setDestinations, setLoading, setError } = destinationSlice.actions;
export default destinationSlice.reducer;