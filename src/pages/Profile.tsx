import { Avatar } from "@/components/ui/avatar"
import { BottomNav } from "@/components/BottomNav"
import { Heart, MapPin, ShoppingBag, Settings, Camera, Medal, Edit2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { 
    icon: Heart, 
    label: "收藏", 
    link: "/favorites",
    count: "28",
    desc: "收藏的内容"
  },
  { 
    icon: MapPin, 
    label: "足迹", 
    link: "/footprints",
    count: "12",
    desc: "去过的地方"
  },
  { 
    icon: ShoppingBag, 
    label: "订单", 
    link: "/orders",
    count: "6",
    desc: "购买的商品"
  }
]

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">      
      <div className="container mx-auto px-4 pb-24 pt-6">
        {/* 用户信息 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="relative group">
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
                className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold">旅行达人</h2>
                <Medal className="h-4 w-4 text-yellow-500" />
                <Badge variant="secondary" className="bg-pink-50 text-pink-600 text-xs">
                  Lv.4
                </Badge>
              </div>
              <p className="text-sm text-gray-500">小红书号：XHSUID8888</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                在路上，寻找生活的诗意 ✨ 记录旅行的点点滴滴
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3 rounded-full px-4 text-xs h-8 border-pink-200 hover:bg-pink-50"
              >
                <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                编辑资料
              </Button>
            </div>

            <Link to="/settings">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Settings className="h-4 w-4 text-gray-500" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-6 mt-6 text-center">
            <button className="hover:bg-gray-50 rounded-xl py-2 transition-colors">
              <div className="font-bold text-lg text-gray-900">12</div>
              <div className="text-xs text-gray-500 mt-0.5">笔记</div>
            </button>
            <button className="hover:bg-gray-50 rounded-xl py-2 transition-colors">
              <div className="font-bold text-lg text-gray-900">238</div>
              <div className="text-xs text-gray-500 mt-0.5">关注</div>
            </button>
            <button className="hover:bg-gray-50 rounded-xl py-2 transition-colors">
              <div className="font-bold text-lg text-gray-900">486</div>
              <div className="text-xs text-gray-500 mt-0.5">粉丝</div>
            </button>
            <button className="hover:bg-gray-50 rounded-xl py-2 transition-colors">
              <div className="font-bold text-lg text-gray-900">1.2k</div>
              <div className="text-xs text-gray-500 mt-0.5">获赞</div>
            </button>
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="mt-4 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link 
                key={item.label} 
                to={item.link}
                className="flex items-center px-5 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50">
                  <Icon className="h-5 w-5 text-pink-500" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{item.desc}</div>
                </div>
                <div className="text-sm text-pink-500 font-medium">{item.count}</div>
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