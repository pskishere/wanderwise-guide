import { Heart, MessageCircle, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

  return (
    <div className={`flex items-center space-x-4 p-4 bg-white rounded-lg ${!notification.isRead ? "border-l-4 border-blue-500" : ""}`}>
      <Avatar>
        <AvatarImage src={notification.avatar} />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 truncate">{notification.content}</p>
        <p className="text-xs text-gray-500">{notification.time}</p>
      </div>
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
    </div>
  )
}