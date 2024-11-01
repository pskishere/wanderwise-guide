export interface Shop {
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
  price: string;
  originalPrice: string;
  description: string;
  sales: string;
  image: string;
  images: string[];
  shop: Shop;
  tags: string[];
  specs: ProductSpec[];
}

export interface PageData<T> {
  items: T[];
  nextCursor?: number;
}