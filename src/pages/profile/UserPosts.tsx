import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { useInfiniteQuery } from "@tanstack/react-query"
import { FavoritesList } from "@/components/favorites/FavoritesList"

interface PostItem {
  id: number
  title: string
  image: string
  author: {
    name: string
    avatar: string
  }
  likes: number
}

interface PostsResponse {
  items: PostItem[]
  nextPage: number | null
}

const fetchUserPosts = async ({ pageParam = 1 }): Promise<PostsResponse> => {
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    items: [
      {
        id: 1,
        title: "京都和服体验｜超详细攻略",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        author: {
          name: "樱花妹",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80"
        },
        likes: 3456
      },
      // ... 其他帖子数据
    ],
    nextPage: pageParam < 3 ? pageParam + 1 : null
  }
}

const UserPosts = () => {
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage 
  } = useInfiniteQuery({
    queryKey: ['user-posts'],
    queryFn: fetchUserPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  const allItems = data?.pages.flatMap(page => page.items) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-3xl">
        <h1 className="text-xl font-bold mb-6">我的笔记</h1>
        
        <FavoritesList
          type="posts"
          items={allItems}
          isLoading={isLoading}
          hasNextPage={!!hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>

      <BottomNav />
    </div>
  )
}

export default UserPosts