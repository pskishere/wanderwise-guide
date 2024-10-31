import { Avatar } from "@/components/ui/avatar"
import { BottomNav } from "@/components/BottomNav"
import { 
  Heart, 
  MapPin, 
  ShoppingBag, 
  MessageCircle, 
  Bell, 
  Settings,
  ChevronRight,
  Camera,
  Edit2
} from "lucide-react"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const menuItems = [
  { 
    icon: Heart, 
    label: "我的收藏", 
    link: "/favorites",
    color: "text-pink-500",
    bgColor: "bg-pink-50"
  },
  { 
    icon: MapPin, 
    label: "我的足迹", 
    link: "/footprints",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  { 
    icon: ShoppingBag, 
    label: "我的订单", 
    link: "/orders",
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  },
  { 
    icon: MessageCircle, 
    label: "我的评论", 
    link: "/comments",
    color: "text-green-500",
    bgColor: "bg-green-50"
  }
]

const settingsItems = [
  { 
    icon: Bell, 
    label: "消息通知", 
    link: "/notifications",
    badge: 2
  },
  { 
    icon: Settings, 
    label: "设置", 
    link: "/settings"
  }
]

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">      
      <div className="container mx-auto px-4 pb-24 pt-6">
        {/* 用户信息卡片 */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-white ring-2 ring-pink-100">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80" 
                    alt="用户头像"
                    className="object-cover"
                  />
                </Avatar>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full"
                >
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">旅行达人</h2>
                  <Button size="icon" variant="ghost" className="h-6 w-6">
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">小红书号：XHSUID8888</p>
                <p className="text-sm text-gray-600 italic">在路上，寻找生活的诗意 ✨</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              编辑资料
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-4 divide-x">
            <div className="text-center">
              <div className="font-semibold">12</div>
              <div className="text-xs text-gray-500 mt-1">笔记</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">238</div>
              <div className="text-xs text-gray-500 mt-1">关注</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">486</div>
              <div className="text-xs text-gray-500 mt-1">粉丝</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">1.2k</div>
              <div className="text-xs text-gray-500 mt-1">获赞</div>
            </div>
          </div>
        </Card>

        {/* 功能菜单 */}
        <div className="mt-4 space-y-4">
          <Card>
            <div className="grid grid-cols-4 divide-x p-4">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    to={item.link}
                    className="flex flex-col items-center gap-2 p-2 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${item.bgColor}`}>
                      <Icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </Card>

          <Card className="divide-y">
            {settingsItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  to={item.link}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </Link>
              )
            })}
          </Card>
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