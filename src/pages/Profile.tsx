import { Avatar } from "@/components/ui/avatar"
import { BottomNav } from "@/components/BottomNav"
import { Heart, MapPin, ShoppingBag, Settings } from "lucide-react"
import { Link } from "react-router-dom"

const menuItems = [
  { 
    icon: Heart, 
    label: "收藏", 
    link: "/favorites",
  },
  { 
    icon: MapPin, 
    label: "足迹", 
    link: "/footprints",
  },
  { 
    icon: ShoppingBag, 
    label: "订单", 
    link: "/orders",
  }
]

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">      
      <div className="container mx-auto px-4 pb-24 pt-6">
        {/* 用户信息 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80" 
                alt="用户头像"
                className="object-cover"
              />
            </Avatar>

            <div className="flex-1">
              <h2 className="text-lg font-semibold">旅行达人</h2>
              <p className="text-sm text-gray-500 mt-0.5">小红书号：XHSUID8888</p>
            </div>

            <Link to="/settings">
              <Settings className="h-5 w-5 text-gray-400" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6 text-center">
            <div>
              <div className="font-medium">12</div>
              <div className="text-sm text-gray-500">笔记</div>
            </div>
            <div>
              <div className="font-medium">238</div>
              <div className="text-sm text-gray-500">关注</div>
            </div>
            <div>
              <div className="font-medium">486</div>
              <div className="text-sm text-gray-500">粉丝</div>
            </div>
            <div>
              <div className="font-medium">1.2k</div>
              <div className="text-sm text-gray-500">获赞</div>
            </div>
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="mt-4 bg-white rounded-xl shadow-sm">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link 
                key={item.label} 
                to={item.link}
                className="flex items-center px-4 py-4 gap-3 hover:bg-gray-50 transition-colors"
              >
                <Icon className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{item.label}</span>
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