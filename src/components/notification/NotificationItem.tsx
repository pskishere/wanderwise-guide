import { Heart, MessageCircle, ShoppingBag } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface Notification {
  id: number
  type: "like" | "comment" | "order"
  content: string
  user?: string
  time: string
  read: boolean
  avatar?: string
  link: string
}

interface NotificationItemProps {
  notification: Notification
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "like":
        return <Heart className="h-4 w-4 text-pink-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "order":
        return <ShoppingBag className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <Link to={notification.link}>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-4 p-4 h-auto hover:bg-gray-50 ${
          !notification.read ? "bg-pink-50/50" : ""
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {notification.avatar ? (
            <Avatar>
              <AvatarImage src={notification.avatar} />
              <AvatarFallback>
                {notification.user?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              {getIcon()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-1">
              {notification.user && (
                <span className="font-medium text-gray-900">{notification.user}</span>
              )}
              <span className="text-gray-600">{notification.content}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {notification.time}
            </p>
          </div>
        </div>
      </Button>
    </Link>
  )
}