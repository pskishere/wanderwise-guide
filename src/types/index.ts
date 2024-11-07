import type { Post, Comment, PageData } from './post';
import type { Product, ProductCategory } from './product';
import type { SearchResult, SearchFilters } from './search';

export type { 
  Post, 
  Comment, 
  PageData,
  Product, 
  ProductCategory, 
  SearchResult, 
  SearchFilters 
};

export interface User {
  id: number;
  name: string;
  avatar: string;
  bio?: string;
  following?: number;
  followers?: number;
  posts?: number;
}

export interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow';
  content: string;
  time: string;
  isRead: boolean;
  avatar: string;
}