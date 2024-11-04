export interface Product {
  id: number;
  title: string;
  price: string;
  originalPrice: string;
  description: string;
  image: string;
  images: string[];
  tags: string[];
  sales: string;
  shop: {
    name: string;
    avatar: string;
  };
  specs: Array<{
    name: string;
    options: string[];
  }>;
  isAvailable?: boolean;
}