import { BottomNav } from "@/components/BottomNav"
import { Heart, MapPin, ShoppingBag, Settings, Camera, Medal, Edit2, Bell, Share2, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RootState } from "@/store/store"
import { UserStats } from "@/components/profile/UserStats"

const menuItems = [
  { 
    icon: Heart, 
    label: "收藏", 
    link: "/favorites"
  },
  { 
    icon: MapPin, 
    label: "我的地址", 
    link: "/address"
  },
  { 
    icon: ShoppingBag, 
    label: "订单", 
    link: "/orders"
  }
]

const Profile = () => {
  const { profile } = useSelector((state: RootState) => state.user)
  const stats = {
    posts: "12",
    following: "238",
    followers: "486"
  }

  return (
    <div className="min-h-screen bg-gray-50">      
      <div className="container mx-auto px-4 pb-24 pt-6">
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img 
                src={profile.avatar}
                alt={profile.nickname}
                className="h-20 w-20 rounded-full object-cover ring-4 ring-pink-100"
              />
              <Button 
                size="icon" 
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-white shadow-lg"
              >
                <Camera className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  {profile.nickname}
                </h2>
                <Medal className="h-4 w-4 text-yellow-500" />
                <Badge variant="secondary" className="bg-gradient-to-r from-pink-50 to-pink-100 text-pink-600 text-xs">
                  Lv.4
                </Badge>
              </div>
              <p className="text-sm text-gray-500">小红书号：{profile.userId}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {profile.bio}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Link to="/profile/edit">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full px-4 text-xs h-8 border-pink-200 hover:bg-pink-50"
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                    编辑资料
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-100"
                >
                  <Share2 className="h-4 w-4 text-gray-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-100"
                >
                  <Bell className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>

            <Link to="/settings">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-gray-100"
              >
                <Settings className="h-4 w-4 text-gray-500" />
              </Button>
            </Link>
          </div>

          <Separator className="my-6" />

          <UserStats stats={stats} />
        </div>

        <div className="mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={item.label}>
                <Link 
                  to={item.link}
                  className="flex items-center px-5 py-4 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-50 group-hover:bg-white transition-colors">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="ml-4 text-sm font-medium text-gray-900">{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                </Link>
                {index < menuItems.length - 1 && (
                  <Separator />
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">当前版本 1.0.0</p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Profile
