import { Avatar } from "@/components/ui/avatar"
import { BottomNav } from "@/components/BottomNav"
import { Heart, MapPin, ShoppingBag, Settings, Camera } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { 
    icon: Heart, 
    label: "收藏", 
    link: "/favorites",
    count: "28",
    desc: "收藏的内容",
    color: "pink",
    bgColor: "bg-pink-50/50"
  },
  { 
    icon: MapPin, 
    label: "足迹", 
    link: "/footprints",
    count: "12",
    desc: "去过的地方",
    color: "blue",
    bgColor: "bg-blue-50/50"
  },
  { 
    icon: ShoppingBag, 
    label: "订单", 
    link: "/orders",
    count: "6",
    desc: "购买的商品",
    color: "orange",
    bgColor: "bg-orange-50/50"
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
              <Avatar className="h-16 w-16 ring-2 ring-pink-100">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80" 
                  alt="用户头像"
                  className="object-cover"
                />
              </Avatar>
              <Button 
                size="icon" 
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white shadow-sm"
              >
                <Camera className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">旅行达人</h2>
                <Badge variant="secondary" className="bg-pink-50 text-pink-600 text-xs">
                  Lv.4
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">小红书号：XHSUID8888</p>
            </div>

            <Link to="/settings">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Settings className="h-4 w-4 text-gray-500" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="mt-4 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const textColorClass = `text-${item.color}-500`
            
            return (
              <Link 
                key={item.label} 
                to={item.link}
                className={`flex items-center px-5 py-4 ${item.bgColor} rounded-2xl transition-all`}
              >
                <Icon className={`h-5 w-5 ${textColorClass}`} />
                <div className="ml-4 flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
                <div className={`text-sm font-medium ${textColorClass}`}>{item.count}</div>
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