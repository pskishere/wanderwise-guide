import { Avatar } from "@/components/ui/avatar"
import { BottomNav } from "@/components/BottomNav"
import { Heart, MapPin, ShoppingBag, Settings, Camera, Medal, Edit2, Bell, Share2, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const menuItems = [
  { 
    icon: Heart, 
    label: "收藏", 
    link: "/favorites",
    count: "28",
    desc: "收藏的内容",
    color: "pink",
    gradient: "from-pink-500/10 to-pink-500/5"
  },
  { 
    icon: MapPin, 
    label: "足迹", 
    link: "/footprints",
    count: "12",
    desc: "去过的地方",
    color: "blue",
    gradient: "from-blue-500/10 to-blue-500/5"
  },
  { 
    icon: ShoppingBag, 
    label: "订单", 
    link: "/orders",
    count: "6",
    desc: "购买的商品",
    color: "orange",
    gradient: "from-orange-500/10 to-orange-500/5"
  }
]

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">      
      <div className="container mx-auto px-4 pb-24 pt-6">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
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
        <div className="mt-4 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const bgColorClass = item.color === 'pink' ? 'bg-pink-50' : 
                               item.color === 'blue' ? 'bg-blue-50' : 'bg-orange-50'
            const textColorClass = item.color === 'pink' ? 'text-pink-500' : 
                                 item.color === 'blue' ? 'text-blue-500' : 'text-orange-500'
            
            return (
              <Link 
                to={item.link}
                key={item.label}
                className={`flex items-center px-5 py-4 bg-gradient-to-r ${item.gradient} rounded-2xl shadow-sm`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bgColorClass}`}>
                  <Icon className={`h-5 w-5 ${textColorClass}`} />
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{item.desc}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`text-sm font-medium ${textColorClass}`}>{item.count}</div>
                  <ChevronRight className={`h-4 w-4 ${textColorClass}`} />
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