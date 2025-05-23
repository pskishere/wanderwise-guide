import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

interface Follower {
  id: number
  name: string
  avatar: string
  bio: string
  isFollowing: boolean
}

const UserFollowers = () => {
  const { toast } = useToast()
  
  const { data: followers, isLoading } = useQuery<Follower[]>({
    queryKey: ['followers'],
    queryFn: async () => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      return [
        {
          id: 1,
          name: "美食家",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
          bio: "探索舌尖上的美味",
          isFollowing: false
        },
        // ... 其他粉丝数据
      ]
    }
  })

  const handleFollow = (userId: number) => {
    toast({
      description: "关注成功",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 pt-20 max-w-3xl">
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-xl animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-48 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-3xl">
        <h1 className="text-xl font-bold mb-6">我的粉丝</h1>
        
        <div className="space-y-4">
          {followers?.map(follower => (
            <div key={follower.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <img src={follower.avatar} alt={follower.name} className="object-cover" />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{follower.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{follower.bio}</p>
                </div>
                <Button 
                  variant={follower.isFollowing ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleFollow(follower.id)}
                  className="flex-shrink-0"
                >
                  {follower.isFollowing ? "已关注" : "关注"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default UserFollowers