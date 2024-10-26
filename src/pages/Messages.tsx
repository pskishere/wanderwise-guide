import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { MessageSkeleton } from "@/components/message/MessageSkeleton"
import { EmptyMessages } from "@/components/message/EmptyMessages"
import { Link } from "react-router-dom"

interface Message {
  id: number
  user: {
    name: string
    avatar: string
  }
  lastMessage: string
  time: string
  unread: number
}

const fetchMessages = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      user: {
        name: "东京导游小王",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
      },
      lastMessage: "好的，我已经帮您预约了明天下午3点的和服体验，记得准时到哦！",
      time: "12:30",
      unread: 2
    },
    {
      id: 2,
      user: {
        name: "京都民宿房东",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
      },
      lastMessage: "您好，我是京都和风民宿的房东，请问您什么时候到达呢？",
      time: "昨天",
      unread: 1
    }
  ]
}

const Messages = () => {
  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">消息</h1>

        <div className="space-y-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => <MessageSkeleton key={i} />)
          ) : !messages?.length ? (
            <EmptyMessages />
          ) : (
            messages.map((message) => (
              <Link to={`/chat/${message.id}`} key={message.id}>
                <Card className="p-4 hover:shadow-lg transition-shadow duration-200 bg-white/50 backdrop-blur-sm">
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
              </Link>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Messages