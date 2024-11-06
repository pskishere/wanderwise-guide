import { useInfiniteQuery } from "@tanstack/react-query"

interface FavoritePost {
  id: number
  title: string
  image: string
  author: {
    name: string
    avatar: string
  }
  likes: number
}

interface FavoriteProduct {
  id: number
  title: string
  price: string
  image: string
  shop: string
}

interface FavoritesResponse {
  items: FavoriteProduct[]
  nextPage?: number
}

const fetchFavorites = async ({ pageParam = 1 }): Promise<FavoritesResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const mockFavorites = [
    {
      id: 1,
      title: "SK-II 神仙水精华液 230ml",
      price: "¥1599",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
      shop: "SK-II官方旗舰店"
    },
    {
      id: 2,
      title: "无印良品 MUJI 简约双肩包",
      price: "¥299",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      shop: "MUJI无印良品旗舰店"
    }
  ]

  const itemsPerPage = 2
  const start = (pageParam - 1) * itemsPerPage
  const end = start + itemsPerPage
  const hasNextPage = end < mockFavorites.length

  return {
    items: mockFavorites.slice(start, end),
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

export type { FavoritePost, FavoriteProduct }