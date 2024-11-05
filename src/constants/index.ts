export * from './config';

export const API_ENDPOINTS = {
  POSTS: '/api/posts',
  PRODUCTS: '/api/products',
  USERS: '/api/users',
  COMMENTS: '/api/comments',
  NOTIFICATIONS: '/api/notifications',
  FAVORITES: '/api/favorites',
  SEARCH: '/api/search',
} as const;

export const PAGE_SIZES = {
  POSTS: 10,
  PRODUCTS: 12,
  COMMENTS: 20,
  NOTIFICATIONS: 15,
} as const;

export const IMAGE_SIZES = {
  AVATAR: {
    SMALL: 32,
    MEDIUM: 48,
    LARGE: 64
  },
  THUMBNAIL: {
    SMALL: 150,
    MEDIUM: 300,
    LARGE: 600
  }
} as const;

export const TOAST_DURATION = 3000;