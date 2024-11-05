import { Bell, Heart, MessageCircle, ShoppingBag } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { NotificationItem } from "@/components/notification/NotificationItem"
import { NotificationSkeleton } from "@/components/notification/NotificationSkeleton"
import { useQuery } from "@tanstack/react-query"
import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"

const mockNotifications = [
  {
    id: 1,
    type: "like" as const,
    content: "赞了你的帖子",
    user: "Sarah Chen",
    time: "2分钟前",
    read: false,
    avatar: "https://i.pravatar.cc/150?u=1",
    link: "/posts/1"
  },
  {
    id: 2,
    type: "comment" as const,
    content: "评论了你的帖子：好文章!",
    user: "Mike Zhang",
    time: "1小时前",
    read: true,
    avatar: "https://i.pravatar.cc/150?u=2",
    link: "/posts/2"
  },
  {
    id: 3,
    type: "order" as const,
    content: "你的订单已发货",
    time: "2小时前",
    read: false,
    link: "/orders/3"
  }
]

export default function Notifications() {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => new Promise(resolve => setTimeout(() => resolve(mockNotifications), 1000)),
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container max-w-2xl mx-auto px-4 pt-20 pb-24">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">通知</h1>
              <span className="text-sm text-pink-500 font-medium">
                {notifications?.filter(n => !n.read).length || 0} 条未读
              </span>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            {isLoading ? (
              <div className="space-y-1">
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
              </div>
            ) : notifications?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">暂无通知</h3>
                <p className="text-sm text-gray-500 mt-1">
                  当有新的通知时，我们会在这里显示
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications?.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}