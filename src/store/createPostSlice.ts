import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostDraft {
  title: string;
  content: string;
  images: string[];
  tags: string[];
}

interface CreatePostState {
  draft: PostDraft;
  loading: boolean;
  error: string | null;
}

const initialState: CreatePostState = {
  draft: {
    title: "",
    content: "",
    images: [],
    tags: []
  },
  loading: false,
  error: null
};

export const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    setDraft: (state, action: PayloadAction<Partial<PostDraft>>) => {
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
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setDraft,
  addImage,
  removeImage,
  toggleTag,
  clearDraft,
  setLoading,
  setError
} = createPostSlice.actions;

export default createPostSlice.reducer;