export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
}

export interface PageData<T> {
  items: T[];
  nextCursor?: number;
}