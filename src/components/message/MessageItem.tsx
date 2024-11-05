import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface MessageUser {
  id: number
  name: string
  avatar: string
}

export interface Message {
  id: number
  user: MessageUser
  lastMessage: string
  time: string
  unread: number
}

interface MessageItemProps {
  message: Message
  onClick: () => void
}

export const MessageItem = ({ message, onClick }: MessageItemProps) => {
  return (
    <Card 
      className="p-4 hover:shadow-lg transition-shadow duration-200 bg-white/50 backdrop-blur-sm cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-4">
        <div className="relative">
          <Avatar className="h-12 w-12">
            <img src={message.user.avatar} alt={message.user.name} />
          </Avatar>
          {message.unread > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-500"
              variant="secondary"
            >
              {message.unread}
            </Badge>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium truncate">{message.user.name}</h3>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
              {message.time}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {message.lastMessage}
          </p>
        </div>
      </div>
    </Card>
  )
}