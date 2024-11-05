import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { MessageSkeleton } from "@/components/message/MessageSkeleton"
import { EmptyMessages } from "@/components/message/EmptyMessages"
import { MessageList } from "@/components/message/MessageList"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { useEffect } from "react"
import { setLoading, setMessages, markAsRead } from "@/store/messageSlice"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

const Messages = () => {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { messages, loading } = useSelector((state: RootState) => state.message)

  useEffect(() => {
    dispatch(setLoading(true))
    // 模拟API调用
    setTimeout(() => {
      dispatch(setMessages([
        {
          id: 1,
          user: {
            id: 1,
            name: "旅行达人",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
          },
          lastMessage: "请问京都和服体验是在哪里预约的呢？",
          time: "3分钟前",
          unread: 2
        },
        {
          id: 2,
          user: {
            id: 2,
            name: "美食家",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&q=80"
          },
          lastMessage: "下次去大阪一定要试试这家店！",
          time: "2小时前",
          unread: 0
        }
      ]))
      dispatch(setLoading(false))
    }, 1000)
  }, [dispatch])

  const handleMessageClick = (messageId: number) => {
    dispatch(markAsRead(messageId))
    toast({
      description: "正在跳转到聊天页面...",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">消息</h1>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <MessageSkeleton key={i} />
            ))}
          </div>
        ) : !messages?.length ? (
          <EmptyMessages />
        ) : (
          <MessageList messages={messages} onMessageClick={handleMessageClick} />
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default Messages