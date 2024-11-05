export * from './post';
export * from './product';
export * from './search';

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
  replyTo?: string;
}