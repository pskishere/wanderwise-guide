import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { UserList } from "@/components/profile/UserList"
import { UserSkeleton } from "@/components/profile/UserSkeleton"

interface User {
  id: number
  name: string
  avatar: string
  bio: string
  isFollowing: boolean
}

const Social = () => {
  const { toast } = useToast()
  
  const { data: followers, isLoading: isLoadingFollowers } = useQuery<User[]>({
    queryKey: ['followers'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return [
        {
          id: 1,
          name: "美食家",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
          bio: "探索舌尖上的美味",
          isFollowing: false
        }
      ]
    }
  })

  const { data: following, isLoading: isLoadingFollowing } = useQuery<User[]>({
    queryKey: ['following'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return [
        {
          id: 1,
          name: "旅行达人",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
          bio: "分享旅行中的美好时刻",
          isFollowing: true
        }
      ]
    }
  })

  const handleFollow = (userId: number) => {
    toast({
      description: "关注成功",
    })
  }

  const handleUnfollow = (userId: number) => {
    toast({
      description: "已取消关注",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-3xl">
        <Tabs defaultValue="followers" className="w-full">
          <TabsList className="w-full h-10 bg-white/90 backdrop-blur-sm sticky top-20 z-10 p-0.5 gap-0.5 rounded-xl shadow-sm">
            <TabsTrigger 
              value="followers" 
              className="w-1/2 h-9 data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=inactive]:text-gray-700 rounded-lg transition-all duration-300"
            >
              粉丝
            </TabsTrigger>
            <TabsTrigger 
              value="following" 
              className="w-1/2 h-9 data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=inactive]:text-gray-700 rounded-lg transition-all duration-300"
            >
              关注
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="followers" className="focus-visible:outline-none">
              {isLoadingFollowers ? (
                <UserSkeleton count={3} />
              ) : (
                <UserList 
                  users={followers || []}
                  onAction={handleFollow}
                  actionLabel="关注"
                  showFollowButton={true}
                />
              )}
            </TabsContent>

            <TabsContent value="following" className="focus-visible:outline-none">
              {isLoadingFollowing ? (
                <UserSkeleton count={3} />
              ) : (
                <UserList 
                  users={following || []}
                  onAction={handleUnfollow}
                  actionLabel="已关注"
                  showFollowButton={true}
                  variant="outline"
                />
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  )
}

export default Social