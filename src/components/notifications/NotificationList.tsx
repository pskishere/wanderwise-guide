import { useQuery } from "@tanstack/react-query"
import { NotificationItem } from "./NotificationItem"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "./EmptyState"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const mockNotifications = [
  {
    id: 1,
    type: "like",
    content: "小明赞了你的游记《东京美食探店》",
    time: "2分钟前",
    isRead: false,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80"
  },
  {
    id: 2,
    type: "comment",
    content: "小红评论了你的游记：好详细的攻略，收藏了！",
    time: "1小时前",
    isRead: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80"
  },
  {
    id: 3,
    type: "follow",
    content: "旅行达人关注了你",
    time: "2小时前",
    isRead: true,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&q=80"
  }
]

export function NotificationList() {
  const { toast } = useToast()
  const { data: notifications, isLoading, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => new Promise(resolve => setTimeout(() => resolve(mockNotifications), 1000))
  })

  const handleMarkAllRead = () => {
    toast({
      description: "已将所有消息标记为已读",
    })
  }

  const handleClearAll = () => {
    toast({
      description: "已清空所有消息",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!notifications?.length) {
    return <EmptyState />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleMarkAllRead}
          >
            全部已读
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleClearAll}
          >
            清空消息
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => refetch()}
        >
          刷新
        </Button>
      </div>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}