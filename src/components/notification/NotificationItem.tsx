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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 shadow-inner">
            <Heart className="h-5 w-5 text-pink-500" />
          </div>
        )
      case "comment":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-inner">
            <MessageCircle className="h-5 w-5 text-blue-500" />
          </div>
        )
      case "order":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-50 to-green-100 shadow-inner">
            <ShoppingBag className="h-5 w-5 text-green-500" />
          </div>
        )
    }
  }

  return (
    <Link to={notification.link}>
      <Button
        variant="ghost"
        className={`group relative w-full justify-start gap-4 p-4 h-auto transition-all duration-200 hover:bg-gray-50/80 ${
          !notification.read ? "bg-pink-50/50" : ""
        }`}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {notification.avatar ? (
            <Avatar className="h-10 w-10 ring-2 ring-white shadow-md transition-transform group-hover:scale-105">
              <AvatarImage src={notification.avatar} />
              <AvatarFallback>
                {notification.user?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="transition-transform group-hover:scale-105">
              {getIcon()}
            </div>
          )}
          
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-start gap-1.5 flex-wrap">
              {notification.user && (
                <span className="font-medium text-gray-900">{notification.user}</span>
              )}
              <span className="text-gray-600">{notification.content}</span>
            </div>
            <p className="text-sm text-gray-500">
              {notification.time}
            </p>
          </div>

          {!notification.read && (
            <div className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-pink-500 ring-4 ring-pink-100 animate-pulse" />
          )}
        </div>
      </Button>
    </Link>
  )
}