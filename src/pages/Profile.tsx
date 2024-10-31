import { Avatar } from "@/components/ui/avatar"
import { BottomNav } from "@/components/BottomNav"
import { Heart, MapPin, ShoppingBag, MessageCircle, Bell, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"

const stats = [
  { label: "笔记", value: "12" },
  { label: "关注", value: "238" },
  { label: "粉丝", value: "486" },
  { label: "获赞", value: "1.2k" },
]

const menuItems = [
  { 
    icon: Heart, 
    label: "收藏", 
    link: "/favorites",
    description: "查看我的收藏内容"
  },
  { 
    icon: MapPin, 
    label: "足迹", 
    link: "/footprints",
    description: "我去过的地方"
  },
  { 
    icon: ShoppingBag, 
    label: "订单", 
    link: "/orders",
    description: "全部消费记录"
  },
  { 
    icon: MessageCircle, 
    label: "评论", 
    link: "/comments",
    description: "我的互动记录"
  },
  { 
    icon: Bell, 
    label: "消息通知", 
    link: "/notifications",
    description: "系统和互动提醒"
  },
  { 
    icon: Settings, 
    label: "设置", 
    link: "/settings",
    description: "偏好和账号设置"
  },
]

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">      
      <div className="container mx-auto px-4 pb-24 max-w-2xl">
        <Card className="mt-6 p-6 shadow-lg">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80" 
                alt="用户头像"
                className="object-cover"
              />
            </Avatar>
            <h2 className="text-xl font-semibold mt-4">旅行达人</h2>
            <p className="text-sm text-gray-500 mt-1">小红书号：XHSUID8888</p>
            <p className="text-sm text-gray-600 mt-2 italic">在路上，寻找生活的诗意 ✨</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-8">
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="text-center p-3 rounded-lg bg-pink-50/50 hover:bg-pink-50 transition-colors"
              >
                <div className="font-semibold text-pink-600">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                to={item.link}
                className="block"
              >
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50">
                      <Icon className="h-5 w-5 text-pink-500" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{item.label}</span>
                      <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                </Card>
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