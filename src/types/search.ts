export interface SearchResult {
  id: number
  type: 'post' | 'product'
  title: string
  image: string
  price?: string
  sales?: string
  shop?: string
  tags?: string[]
  author?: {
    name: string
    avatar: string
  }
  likes?: number
  comments?: number
}

export interface SearchFilters {
  type?: 'post' | 'product';
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'date' | 'popularity';
  tags?: string[];
}