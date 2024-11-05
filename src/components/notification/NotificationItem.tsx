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
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 shadow-inner">
            <Heart className="h-6 w-6 text-pink-500" />
          </div>
        )
      case "comment":
        return (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-inner">
            <MessageCircle className="h-6 w-6 text-blue-500" />
          </div>
        )
      case "order":
        return (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-50 to-green-100 shadow-inner">
            <ShoppingBag className="h-6 w-6 text-green-500" />
          </div>
        )
    }
  }

  return (
    <Link to={notification.link}>
      <Button
        variant="ghost"
        className={`group relative w-full justify-start gap-6 px-6 py-5 h-auto transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50/30 hover:to-transparent ${
          !notification.read ? "bg-gradient-to-r from-pink-50/50 to-transparent" : ""
        }`}
      >
        <div className="flex items-start gap-6 flex-1 min-w-0">
          {notification.avatar ? (
            <Avatar className="h-14 w-14 rounded-2xl ring-2 ring-white shadow-md transition-transform group-hover:scale-105 group-hover:rotate-2">
              <AvatarImage src={notification.avatar} className="rounded-2xl" />
              <AvatarFallback className="rounded-2xl">
                {notification.user?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="transition-transform group-hover:scale-105 group-hover:rotate-2">
              {getIcon()}
            </div>
          )}
          
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start gap-2 flex-wrap">
              {notification.user && (
                <span className="font-medium text-gray-900">{notification.user}</span>
              )}
              <span className="text-gray-600 leading-relaxed">{notification.content}</span>
            </div>
            <p className="text-sm text-gray-500">
              {notification.time}
            </p>
          </div>

          {!notification.read && (
            <div className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 ring-4 ring-pink-100 animate-pulse" />
          )}
        </div>
      </Button>
    </Link>
  )
}