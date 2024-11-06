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
  items: FavoriteProduct[] | FavoritePost[]
  nextPage?: number
}

const fetchFavorites = async ({ pageParam = 1, type = "products" }): Promise<FavoritesResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const mockProducts = [
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

  const mockPosts = [
    {
      id: 1,
      title: "东京和服体验｜超详细攻略",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
      author: {
        name: "樱花妹",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80"
      },
      likes: 3456
    },
    {
      id: 2, 
      title: "京都赏樱一日游记，感受春日浪漫",
      image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80",
      author: {
        name: "旅行家",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
      },
      likes: 2890
    }
  ]

  const items = type === "products" ? mockProducts : mockPosts
  const itemsPerPage = 2
  const start = (pageParam - 1) * itemsPerPage
  const end = start + itemsPerPage
  const hasNextPage = end < items.length

  return {
    items: items.slice(start, end),
    nextPage: hasNextPage ? pageParam + 1 : undefined
  }
}

export const useFavorites = (type: "posts" | "products" = "products") => {
  return useInfiniteQuery({
    queryKey: ['favorites', type],
    queryFn: ({ pageParam }) => fetchFavorites({ pageParam, type }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1
  })
}

export type { FavoritePost, FavoriteProduct }