import { Heart, MessageCircle, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useDispatch } from "react-redux"
import { markAsRead } from "@/store/slices/notificationSlice"

interface NotificationItemProps {
  notification: {
    id: number
    type: "like" | "comment" | "follow"
    content: string
    time: string
    isRead: boolean
    avatar: string
  }
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { toast } = useToast()
  const dispatch = useDispatch()

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

  const handleMarkRead = () => {
    dispatch(markAsRead(notification.id))
    toast({
      description: "已标记为已读",
    })
  }

  return (
    <div 
      className={`flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow 
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