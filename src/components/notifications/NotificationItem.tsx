import { Heart, MessageCircle, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useDispatch } from "react-redux"
import { markAsRead } from "@/store/slices/notificationSlice"
import { useNavigate } from "react-router-dom"

interface NotificationItemProps {
  notification: {
    id: number
    type: "like" | "comment" | "follow"
    content: string
    time: string
    isRead: boolean
    avatar: string
    targetId?: number // 添加目标ID字段
  }
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getIcon = () => {
    switch (notification.type) {
      case "like":
        return <Heart className="h-4 w-4 text-pink-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />
    }
  }

  const handleMarkRead = (e: React.MouseEvent) => {
    e.stopPropagation() // 阻止事件冒泡
    dispatch(markAsRead(notification.id))
    toast({
      description: "已标记为已读",
    })
  }

  const handleClick = () => {
    if (!notification.targetId) return

    // 根据不同类型的消息跳转到不同页面
    switch (notification.type) {
      case "like":
      case "comment":
        navigate(`/posts/${notification.targetId}`)
        break
      case "follow":
        navigate(`/profile/${notification.targetId}`)
        break
    }

    // 如果未读，标记为已读
    if (!notification.isRead) {
      dispatch(markAsRead(notification.id))
    }
  }

  return (
    <div 
      onClick={handleClick}
      className={`flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer
        ${!notification.isRead ? "border-l-4 border-blue-500" : ""}`}
    >
      <Avatar className="h-12 w-12">
        <AvatarImage src={notification.avatar} />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{notification.content}</p>
        <div className="flex items-center space-x-2 mt-1">
          <p className="text-xs text-gray-500">{notification.time}</p>
          {!notification.isRead && (
            <Button 
              variant="ghost" 
              size="xs" 
              onClick={handleMarkRead}
              className="h-6 px-2 text-xs text-blue-500 hover:text-blue-600"
            >
              标记已读
            </Button>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
    </div>
  )
}