import { BottomNav } from "@/components/BottomNav"
import { Heart, MapPin, ShoppingBag, Settings, Camera, Medal, Edit2, Bell, Share2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar } from "@/components/ui/avatar"

const menuItems = [
  { 
    icon: Heart, 
    label: "收藏", 
    link: "/favorites",
    color: "pink"
  },
  { 
    icon: MapPin, 
    label: "我的地址", 
    link: "/address/new",
    color: "blue"
  },
  { 
    icon: ShoppingBag, 
    label: "订单", 
    link: "/orders",
    color: "orange"
  }
]

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100">      
      <div className="container mx-auto px-4 pb-24 pt-6">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20 ring-4 ring-pink-100">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80" 
                  alt="用户头像"
                  className="object-cover"
                />
              </Avatar>
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
                  旅行达人
                </h2>
                <Medal className="h-4 w-4 text-yellow-500" />
                <Badge variant="secondary" className="bg-gradient-to-r from-pink-50 to-pink-100 text-pink-600 text-xs">
                  Lv.4
                </Badge>
              </div>
              <p className="text-sm text-gray-500">小红书号：XHSUID8888</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                在路上，寻找生活的诗意 ✨ 记录旅行的点点滴滴
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

          <div className="grid grid-cols-4 gap-6 text-center">
            {[
              { label: "笔记", count: "12" },
              { label: "关注", count: "238" },
              { label: "粉丝", count: "486" },
              { label: "获赞", count: "1.2k" }
            ].map((item) => (
              <button 
                key={item.label}
                className="hover:bg-gray-50 rounded-xl py-2 transition-colors"
              >
                <div className="font-bold text-lg text-gray-900">
                  {item.count}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="mt-4 grid gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const colorMap = {
              pink: "text-pink-600 bg-pink-100",
              blue: "text-blue-600 bg-blue-100",
              orange: "text-orange-600 bg-orange-100"
            }
            const colors = colorMap[item.color as keyof typeof colorMap]
            
            return (
              <Link 
                to={item.link}
                key={item.label}
                className="flex items-center px-4 py-3.5 bg-white rounded-xl hover:bg-gray-50/80 transition-colors shadow-sm"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.split(" ")[1]}`}>
                  <Icon className={`h-5 w-5 ${colors.split(" ")[0]}`} />
                </div>
                <span className="ml-3 font-medium text-gray-900">{item.label}</span>
                <div className="ml-auto">
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
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
