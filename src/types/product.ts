export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  originalPrice?: string;
  description?: string;
  sales?: string;
  images?: string[];
  shop?: {
    name: string;
    avatar: string;
  };
  tags?: string[];
  specs?: any[];
}

export interface PageData<T> {
  items: T[];
  nextCursor?: number;
}