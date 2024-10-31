import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSkeleton } from "@/components/message/MessageSkeleton"
import { EmptyMessages } from "@/components/message/EmptyMessages"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { useEffect } from "react"
import { setLoading, setMessages } from "@/store/messageSlice"

const Messages = () => {
  const dispatch = useDispatch()
  const { messages, loading } = useSelector((state: RootState) => state.message)

  useEffect(() => {
    dispatch(setLoading(true))
    // 模拟API调用
    setTimeout(() => {
      dispatch(setMessages(messages))
      dispatch(setLoading(false))
    }, 1000)
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">消息</h1>

        <div className="space-y-4">
          {loading ? (
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