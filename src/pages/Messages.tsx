import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { MessageSkeleton } from "@/components/message/MessageSkeleton"
import { EmptyMessages } from "@/components/message/EmptyMessages"
import { MessageList } from "@/components/message/MessageList"
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">消息</h1>

        {loading ? (
          Array(3).fill(0).map((_, i) => <MessageSkeleton key={i} />)
        ) : !messages?.length ? (
          <EmptyMessages />
        ) : (
          <MessageList messages={messages} />
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default Messages