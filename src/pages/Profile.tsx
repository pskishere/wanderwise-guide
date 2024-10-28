import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Heart, MapPin, ShoppingBag, MessageCircle, Bell, Settings, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

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
    color: "text-pink-500",
    bgColor: "bg-pink-50" 
  },
  { 
    icon: MapPin, 
    label: "足迹", 
    link: "/footprints",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  { 
    icon: ShoppingBag, 
    label: "订单", 
    link: "/orders",
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  { 
    icon: MessageCircle, 
    label: "评论", 
    link: "/comments",
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  { 
    icon: Bell, 
    label: "消息通知", 
    link: "/notifications",
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  },
  { 
    icon: Settings, 
    label: "设置", 
    link: "/settings",
    color: "text-gray-500",
    bgColor: "bg-gray-50"
  },
]

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">      
      <div className="relative h-[280px] bg-gradient-to-b from-pink-500/10 via-pink-50/5 to-gray-50">
        <div className="absolute inset-x-0 top-12 px-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <Avatar className="h-20 w-20 ring-2 ring-white/80 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80" 
                  alt="用户头像"
                  className="object-cover"
                />
              </Avatar>
              <div className="mt-1">
                <h2 className="text-xl font-semibold">旅行达人</h2>
                <p className="text-sm text-gray-600 mt-1.5">小红书号：XHSUID8888</p>
                <p className="text-sm text-gray-600 mt-1">在路上，寻找生活的诗意 ✨</p>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600 h-8 px-4 rounded-full text-sm">
                    编辑资料
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50 h-8 px-4 rounded-full text-sm">
                    分享主页
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8 px-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-semibold">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <Card className="divide-y divide-gray-100 shadow-sm bg-white/70 backdrop-blur-sm rounded-2xl">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                to={item.link}
                className="flex items-center justify-between p-4 hover:bg-gray-50/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${item.bgColor}`}>
                    <Icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            )
          })}
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">当前版本 1.0.0</p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Profile