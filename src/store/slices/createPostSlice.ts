import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreatePostState {
  draft: {
    title: string;
    content: string;
    images: string[];
    tags: string[];
    location: string;
    products?: {
      id: number;
      title: string;
      price: string;
      image: string;
    }[];
  };
  loading: boolean;
  error: string | null;
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
  error: null
};

export const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDraft: (state, action: PayloadAction<Partial<CreatePostState['draft']>>) => {
      state.draft = { ...state.draft, ...action.payload };
    },
    addImage: (state, action: PayloadAction<string>) => {
      state.draft.images.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.draft.images.splice(action.payload, 1);
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const index = state.draft.tags.indexOf(action.payload);
      if (index === -1) {
        state.draft.tags.push(action.payload);
      } else {
        state.draft.tags.splice(index, 1);
      }
    },
    clearDraft: (state) => {
      state.draft = initialState.draft;
    }
  }
});

export const {
  setLoading,
  setDraft,
  addImage,
  removeImage,
  toggleTag,
  clearDraft
} = createPostSlice.actions;

export default createPostSlice.reducer;