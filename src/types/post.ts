export interface Post {
  id: number;
  title: string;
  content: string;
  images: string[];
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  stats: {
    likes: number;
    comments: number;
    favorites: number;
  };
  tags: string[];
  createdAt: string;
}