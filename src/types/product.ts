export interface Shop {
  id: number;
  name: string;
  avatar: string;
}

export interface ProductSpec {
  name: string;
  options: string[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  shop: Shop;
  tags: string[];
  specs: ProductSpec[];
  richDescription?: string;
  sales?: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  image: string;
}

export interface PageData<T> {
  items: T[];
  nextCursor?: number;
}