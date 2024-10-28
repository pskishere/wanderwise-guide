import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Settings, Heart, MapPin, ShoppingBag, MessageCircle, Bell, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const stats = [
  { label: "笔记", value: "12" },
  { label: "关注", value: "238" },
  { label: "粉丝", value: "486" },
  { label: "获赞", value: "1.2k" },
]

const menuItems = [
  { icon: Heart, label: "收藏", link: "/favorites", color: "text-pink-500" },
  { icon: MapPin, label: "足迹", link: "/footprints", color: "text-blue-500" },
  { icon: ShoppingBag, label: "订单", link: "/orders", color: "text-orange-500" },
  { icon: MessageCircle, label: "评论", link: "/comments", color: "text-green-500" },
  { icon: Bell, label: "消息通知", link: "/notifications", color: "text-purple-500" },
  { icon: Settings, label: "设置", link: "/settings", color: "text-gray-500" },
]

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-20">      
      <Navigation />
      
      {/* Profile Header */}
      <div className="relative pt-20">
        <div className="container max-w-lg mx-auto px-4">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80" 
                alt="用户头像"
                className="object-cover"
              />
            </Avatar>
            <h2 className="text-2xl font-bold mt-4">旅行达人</h2>
            <p className="text-sm text-gray-500 mt-1">小红书号：XHSUID8888</p>
            <p className="text-sm text-gray-600 mt-2 text-center">在路上，寻找生活的诗意 ✨</p>
            
            <div className="flex gap-3 mt-6">
              <Button size="sm" className="rounded-full px-6">
                编辑资料
              </Button>
              <Button size="sm" variant="outline" className="rounded-full px-6">
                分享主页
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 w-full mt-8 mb-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-semibold text-lg">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container max-w-lg mx-auto px-4">
        <Card className="divide-y border-gray-100 shadow-sm bg-white/70 backdrop-blur-sm rounded-2xl">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                to={item.link}
                className="flex items-center justify-between p-4 hover:bg-gray-50/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${item.color} bg-opacity-10`}>
                    <Icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            )
          })}
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">当前版本 1.0.0</p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Profile