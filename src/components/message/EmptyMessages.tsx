import { MessageSquareOff } from "lucide-react"

export const EmptyMessages = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <MessageSquareOff className="h-12 w-12 mb-4 stroke-1" />
      <p className="text-sm">暂无消息</p>
    </div>
  )
}