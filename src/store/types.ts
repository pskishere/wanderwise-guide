import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface AsyncState {
  loading: boolean;
  error: string | null;
}

export interface PaginatedState<T> extends AsyncState {
  items: T[];
  hasMore: boolean;
  page: number;
}