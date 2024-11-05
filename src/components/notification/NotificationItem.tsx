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
        return (
          <div className="h-8 w-8 rounded-full bg-pink-50 flex items-center justify-center">
            <Heart className="h-4 w-4 text-pink-500" />
          </div>
        )
      case "comment":
        return (
          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
            <MessageCircle className="h-4 w-4 text-blue-500" />
          </div>
        )
      case "order":
        return (
          <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
            <ShoppingBag className="h-4 w-4 text-green-500" />
          </div>
        )
    }
  }

  return (
    <Link to={notification.link}>
      <Button
        variant="ghost"
        className={`relative w-full justify-start gap-4 p-4 h-auto hover:bg-gray-50/80 ${
          !notification.read ? "bg-pink-50/50" : ""
        }`}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {notification.avatar ? (
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage src={notification.avatar} />
              <AvatarFallback>
                {notification.user?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          ) : (
            getIcon()
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-1.5 flex-wrap">
              {notification.user && (
                <span className="font-medium text-gray-900">{notification.user}</span>
              )}
              <span className="text-gray-600">{notification.content}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1.5">
              {notification.time}
            </p>
          </div>
          {!notification.read && (
            <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-pink-500 ring-4 ring-pink-50" />
          )}
        </div>
      </Button>
    </Link>
  )
}