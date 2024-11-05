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
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50">
            <Heart className="h-5 w-5 text-pink-500" />
          </div>
        )
      case "comment":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
            <MessageCircle className="h-5 w-5 text-blue-500" />
          </div>
        )
      case "order":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
            <ShoppingBag className="h-5 w-5 text-green-500" />
          </div>
        )
    }
  }

  return (
    <Link to={notification.link}>
      <Button
        variant="ghost"
        className={`group relative w-full justify-start gap-4 px-4 py-3 h-auto ${
          !notification.read ? "bg-pink-50/50" : ""
        }`}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {notification.avatar ? (
            <Avatar className="h-12 w-12 rounded-xl">
              <AvatarImage src={notification.avatar} className="rounded-xl" />
              <AvatarFallback className="rounded-xl">
                {notification.user?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          ) : (
            getIcon()
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-1 flex-wrap">
              {notification.user && (
                <span className="font-medium text-gray-900">{notification.user}</span>
              )}
              <span className="text-gray-600 text-sm leading-relaxed">{notification.content}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {notification.time}
            </p>
          </div>

          {!notification.read && (
            <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-pink-500" />
          )}
        </div>
      </Button>
    </Link>
  )
}
