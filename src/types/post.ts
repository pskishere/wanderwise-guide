export interface Post {
  id: number;
  title: string;
  content: string;
  images: string[];
  image?: string; // For backwards compatibility
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  stats: {
    likes: number;
    comments: number;
    favorites: number;
  };
  tags: string[];
  location?: string;
  createdAt: string;
  likes?: number; // For backwards compatibility
  comments?: number; // For backwards compatibility
}

export interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  likes: number;
  replies?: Comment[];
}

export interface PageData<T> {
  items: T[];
  nextCursor?: number;
}