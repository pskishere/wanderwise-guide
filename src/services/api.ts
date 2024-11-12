import { Product, PageData } from '@/types/product';
import { mockProducts } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = async (
  category: string = 'all',
  cursor?: number
): Promise<PageData<Product>> => {
  await delay(1000);
  
  const pageSize = 8;
  const filteredProducts = category === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => 
        product.tags.some(tag => tag.includes(category)) ||
        product.title.includes(category)
      );

  const start = cursor || 0;
  const items = filteredProducts.slice(start, start + pageSize);
  const nextCursor = start + pageSize < filteredProducts.length ? start + pageSize : undefined;

  return { items, nextCursor };
};

export type { Product, PageData };