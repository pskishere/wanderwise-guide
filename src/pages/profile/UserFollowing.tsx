import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/types"
import { toggleFollow } from "@/store/slices/userSlice"

const UserFollowing = () => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const { following, loading } = useSelector((state: RootState) => state.user)

  const handleUnfollow = (userId: number) => {
    dispatch(toggleFollow(userId))
    toast({
      description: "已取消关注",
    })
  }

  if (loading) {
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
        <h1 className="text-xl font-bold mb-6">我的关注</h1>
        
        <div className="space-y-4">
          {following?.map(user => (
            <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{user.bio}</p>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleUnfollow(user.id)}
                  className="flex-shrink-0"
                >
                  已关注
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

export default UserFollowing