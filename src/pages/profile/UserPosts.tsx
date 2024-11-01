import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { useInfiniteQuery } from "@tanstack/react-query"
import { FavoritesList } from "@/components/favorites/FavoritesList"
import { Button } from "@/components/ui/button"
import { PenLine } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

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

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-4">
      <PenLine className="w-10 h-10 text-pink-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">还没有笔记</h3>
    <p className="text-gray-500 text-center mb-6">
      记录旅行中的精彩时刻，分享你的所见所闻
    </p>
    <Link to="/create-post">
      <Button className="rounded-full bg-pink-500 hover:bg-pink-600">
        开始写笔记
      </Button>
    </Link>
  </div>
)

const UserPosts = () => {
  const { toast } = useToast()
  
  const { 
    data, 
    isLoading,
    isError, 
    fetchNextPage, 
    hasNextPage 
  } = useInfiniteQuery({
    queryKey: ['user-posts'],
    queryFn: fetchUserPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  if (isError) {
    toast({
      variant: "destructive",
      description: "加载笔记失败，请稍后重试",
    })
  }

  const allItems = data?.pages.flatMap(page => page.items) || []
  const isEmpty = !isLoading && allItems.length === 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-24 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">我的笔记</h1>
          <Link to="/create-post">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full border-pink-200 text-pink-500 hover:bg-pink-50"
            >
              <PenLine className="w-4 h-4 mr-1" />
              写笔记
            </Button>
          </Link>
        </div>
        
        {isEmpty ? (
          <EmptyState />
        ) : (
          <FavoritesList
            type="posts"
            items={allItems}
            isLoading={isLoading}
            hasNextPage={!!hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default UserPosts