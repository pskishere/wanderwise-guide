import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Settings, Heart, MapPin, ShoppingBag, MessageCircle, Share2, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const stats = [
  { label: "游记", value: "12" },
  { label: "关注", value: "238" },
  { label: "粉丝", value: "486" },
  { label: "获赞", value: "1.2k" },
]

const menuItems = [
  { icon: Heart, label: "我的收藏", link: "/favorites" },
  { icon: MapPin, label: "我的足迹", link: "/footprints" },
  { icon: ShoppingBag, label: "我的订单", link: "/orders" },
  { icon: MessageCircle, label: "我的评论", link: "/comments" },
  { icon: Share2, label: "我的分享", link: "/shares" },
]

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">      
      {/* User Info Card */}
      <Card className="mx-4 mt-4 p-4 border-none shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16 ring-4 ring-pink-500/20">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80" 
                alt="用户头像"
                className="object-cover"
              />
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">旅行达人</h2>
              <p className="text-sm text-gray-500 mt-1">在路上，寻找生活的诗意 ✨</p>
              <Button variant="outline" size="sm" className="mt-2">
                编辑资料
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-semibold">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Menu Items */}
      <Card className="mx-4 mt-4 divide-y border-none shadow-lg">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              to={item.link}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-gray-500" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          )
        })}
      </Card>

      <BottomNav />
    </div>
  )
}

export default Profile