import { Bell, Heart, MessageCircle, ShoppingBag } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { NotificationItem } from "@/components/notification/NotificationItem"
import { NotificationSkeleton } from "@/components/notification/NotificationSkeleton"
import { useQuery } from "@tanstack/react-query"

const mockNotifications = [
  {
    id: 1,
    type: "like",
    content: "赞了你的帖子",
    user: "Sarah Chen",
    time: "2分钟前",
    read: false,
    avatar: "https://i.pravatar.cc/150?u=1",
    link: "/posts/1"
  },
  {
    id: 2,
    type: "comment",
    content: "评论了你的帖子：好文章!",
    user: "Mike Zhang",
    time: "1小时前",
    read: true,
    avatar: "https://i.pravatar.cc/150?u=2",
    link: "/posts/2"
  },
  {
    id: 3,
    type: "order",
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
    <div className="container max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">通知</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {notifications?.filter(n => !n.read).length || 0} 条未读
          </span>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        {isLoading ? (
          <div className="space-y-4">
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
          </div>
        ) : notifications?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">暂无通知</h3>
            <p className="text-sm text-muted-foreground mt-1">
              当有新的通知时，我们会在这里显示
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {notifications?.map((notification, index) => (
              <div key={notification.id}>
                <NotificationItem notification={notification} />
                {index < notifications.length - 1 && (
                  <Separator className="my-1" />
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}