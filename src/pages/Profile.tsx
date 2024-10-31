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
  Edit2,
  Sparkles,
  Medal,
  Trophy
} from "lucide-react"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const menuItems = [
  { 
    icon: Trophy,
    label: "我的成就", 
    link: "/achievements",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    stats: "12 个徽章"
  },
  { 
    icon: Heart, 
    label: "我的收藏", 
    link: "/favorites",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    stats: "28 个收藏"
  },
  { 
    icon: MapPin, 
    label: "我的足迹", 
    link: "/footprints",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    stats: "8 个城市"
  },
  { 
    icon: ShoppingBag, 
    label: "我的订单", 
    link: "/orders",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    stats: "6 个订单"
  }
]

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 via-white to-blue-50/30">      
      <div className="container mx-auto px-4 pb-24 pt-6">
        {/* 用户信息卡片 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 relative overflow-hidden">
            {/* 装饰背景 */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full blur-2xl opacity-50" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-tr from-blue-100 to-green-100 rounded-full blur-2xl opacity-50" />
            
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="relative group">
                  <Avatar className="h-20 w-20 ring-4 ring-pink-100 transition-all duration-300 group-hover:ring-pink-200">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80" 
                      alt="用户头像"
                      className="object-cover"
                    />
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">旅行达人</h2>
                    <Medal className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">小红书号：XHSUID8888</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      <p className="italic">在路上，寻找生活的诗意 ✨</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    编辑个人资料
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 divide-x">
                <motion.div 
                  className="text-center cursor-pointer hover:bg-gray-50 py-2 rounded-l-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="font-bold text-lg text-pink-600">12</div>
                  <div className="text-xs text-gray-500 mt-0.5">笔记</div>
                </motion.div>
                <motion.div 
                  className="text-center cursor-pointer hover:bg-gray-50 py-2 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="font-bold text-lg text-pink-600">238</div>
                  <div className="text-xs text-gray-500 mt-0.5">关注</div>
                </motion.div>
                <motion.div 
                  className="text-center cursor-pointer hover:bg-gray-50 py-2 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="font-bold text-lg text-pink-600">486</div>
                  <div className="text-xs text-gray-500 mt-0.5">粉丝</div>
                </motion.div>
                <motion.div 
                  className="text-center cursor-pointer hover:bg-gray-50 py-2 rounded-r-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="font-bold text-lg text-pink-600">1.2k</div>
                  <div className="text-xs text-gray-500 mt-0.5">获赞</div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 功能菜单 */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link to={item.link}>
                  <Card className="p-4 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.label}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{item.stats}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
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