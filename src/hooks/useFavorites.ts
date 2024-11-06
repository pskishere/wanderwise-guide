import { useInfiniteQuery } from "@tanstack/react-query"

interface FavoriteItem {
  id: number
  title: string
  content?: string
  price?: string
  image: string
  author?: {
    name: string
    avatar: string
  }
  likes?: number
}

interface PageData {
  items: FavoriteItem[]
  nextCursor?: number
}

const fetchFavorites = async (
  type: "posts" | "products",
  cursor?: number
): Promise<PageData> => {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const pageSize = 10
  const totalItems = 50
  
  const items = Array.from({ length: pageSize }, (_, i) => {
    const id = (cursor || 0) + i + 1
    
    if (type === "posts") {
      return {
        id,
        title: `收藏的帖子 ${id}`,
        content: "这是一段帖子内容描述...",
        image: `https://picsum.photos/seed/${id}/400/600`,
        author: {
          name: "用户名",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + id
        },
        likes: Math.floor(Math.random() * 1000)
      }
    }
    
    return {
      id,
      title: `收藏的商品 ${id}`,
      price: "¥" + Math.floor(Math.random() * 1000),
      image: `https://picsum.photos/seed/product${id}/400/600`
    }
  })
  
  const nextCursor = (cursor || 0) + pageSize < totalItems 
    ? (cursor || 0) + pageSize 
    : undefined
  
  return { items, nextCursor }
}

export const useFavorites = (type: "posts" | "products") => {
  return useInfiniteQuery({
    queryKey: ["favorites", type],
    queryFn: ({ pageParam }) => fetchFavorites(type, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}