import { Bell } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationItem } from "@/components/notification/NotificationItem"
import { NotificationSkeleton } from "@/components/notification/NotificationSkeleton"
import { useQuery } from "@tanstack/react-query"
import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const mockNotifications = [
  {
    id: 1,
    type: "like" as const,
    content: "赞了你的笔记「东京银座探店攻略」",
    user: "Sarah Chen",
    time: "2分钟前",
    read: false,
    avatar: "https://i.pravatar.cc/150?u=1",
    link: "/posts/1"
  },
  {
    id: 2,
    type: "comment" as const,
    content: "评论了你的笔记：好文章，下次去东京一定要去试试！",
    user: "Mike Zhang",
    time: "1小时前",
    read: true,
    avatar: "https://i.pravatar.cc/150?u=2",
    link: "/posts/2"
  },
  {
    id: 3,
    type: "order" as const,
    content: "你购买的「日本限定樱花抹茶Kit Kat」已发货",
    time: "2小时前",
    read: false,
    link: "/orders/3"
  },
  {
    id: 4,
    type: "like" as const,
    content: "赞了你的评论：「推荐去涉谷Sky Scramble，视野超棒！」",
    user: "David Wang",
    time: "3小时前",
    read: true,
    avatar: "https://i.pravatar.cc/150?u=4",
    link: "/posts/4"
  }
]

export default function Notifications() {
  const { toast } = useToast()
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => new Promise(resolve => setTimeout(() => resolve(mockNotifications), 1000)),
  })

  const unreadCount = notifications?.filter(n => !n.read).length || 0

  const handleMarkAllAsRead = () => {
    toast({
      title: "已全部标记为已读",
      description: "所有未读通知已更新",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navigation />
      
      <div className="container max-w-2xl mx-auto px-4 pt-20 pb-24">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
          <div className="p-4 border-b sticky top-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/50 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold">消息通知</h1>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 ring-1 ring-pink-100/50">
                    {unreadCount}条未读
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-sm font-medium text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                >
                  全部标记为已读
                </Button>
              )}
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