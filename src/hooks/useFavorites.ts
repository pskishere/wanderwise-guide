import { useInfiniteQuery } from "@tanstack/react-query"
import { SearchResult } from "@/types/search"
import { supabase } from "@/integrations/supabase/client"

interface FavoritesResponse {
  items: SearchResult[];
  nextCursor?: number;
}

interface PostProfile {
  nickname: string;
  avatar: string;
}

const fetchFavorites = async ({ pageParam = 1 }) => {
  const itemsPerPage = 6
  const start = (pageParam - 1) * itemsPerPage
  
  // Fetch favorite posts with related data
  const { data: postData, error: postError } = await supabase
    .from('favorites')
    .select(`
      post_id,
      posts (
        id,
        title,
        images,
        user_id,
        profiles!posts_user_id_fkey (
          nickname,
          avatar
        ),
        likes (count)
      )
    `)
    .is('product_id', null)
    .range(start, start + itemsPerPage - 1)
    .order('created_at', { ascending: false })

  if (postError) throw postError

  // Fetch favorite products with related data
  const { data: productData, error: productError } = await supabase
    .from('favorites')
    .select(`
      product_id,
      products (
        id,
        title,
        price,
        images,
        sales
      )
    `)
    .is('post_id', null)
    .range(start, start + itemsPerPage - 1)
    .order('created_at', { ascending: false })

  if (productError) throw productError

  // Transform data to match the expected format
  const posts = postData
    .filter(item => item.posts)
    .map(item => ({
      id: item.posts.id,
      type: 'post' as const,
      title: item.posts.title,
      image: item.posts.images[0],
      author: {
        name: item.posts.profiles?.nickname || 'Unknown User',
        avatar: item.posts.profiles?.avatar || ''
      },
      likes: item.posts.likes?.[0]?.count || 0
    }))

  const products = productData
    .filter(item => item.products)
    .map(item => ({
      id: item.products.id,
      type: 'product' as const,
      title: item.products.title,
      price: `¥${item.products.price}`,
      image: item.products.images[0],
      sales: item.products.sales || 0,
      shop: 'Shop Name' // Adding this to match FavoriteProduct type
    }))

  const hasNextPage = posts.length === itemsPerPage || products.length === itemsPerPage

  return {
    items: posts,
    products: products,
    nextPage: hasNextPage ? pageParam + 1 : undefined
  }
}

export const useFavorites = () => {
  return useInfiniteQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1
  })
}