import { BellOff } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <BellOff className="h-12 w-12 mb-4 text-gray-400" />
      <p className="text-gray-500">暂无消息通知</p>
    </div>
  )
}