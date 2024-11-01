import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { useInfiniteQuery } from "@tanstack/react-query"
import { FavoritesList } from "@/components/favorites/FavoritesList"
import { Button } from "@/components/ui/button"
import { PenLine, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

const PostCard = ({ post, onDelete }: { post: PostItem; onDelete: (id: number) => void }) => {
  return (
    <div className="relative group">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/50 hover:bg-black/70 text-white"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除这篇笔记吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(post.id)}
              className="bg-red-500 hover:bg-red-600"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-[4/3] relative">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium line-clamp-2 mb-2">{post.title}</h3>
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-500">{post.author.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserPosts = () => {
  const { toast } = useToast()
  
  const { 
    data, 
    isLoading,
    isError, 
    fetchNextPage, 
    hasNextPage,
    refetch 
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

  const handleDelete = async (id: number) => {
    try {
      // Mock API call for delete
      await new Promise(resolve => setTimeout(resolve, 500))
      
      toast({
        description: "笔记已删除",
      })
      
      // Refetch posts after deletion
      refetch()
    } catch (error) {
      toast({
        variant: "destructive",
        description: "删除失败，请重试",
      })
    }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allItems.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default UserPosts