import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface ReplyInputProps {
  onSubmit: (content: string) => void
  onCancel: () => void
  replyTo: string
}

export const ReplyInput = ({ onSubmit, onCancel, replyTo }: ReplyInputProps) => {
  const [content, setContent] = useState("")

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
      setContent("")
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white/80 backdrop-blur-lg border-t shadow-lg">
      <div className="max-w-lg mx-auto px-4 py-3 pb-[calc(env(safe-area-inset-bottom,_0px)_+_0.75rem)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">回复</span>
            <span className="text-sm text-pink-500">@{replyTo}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-7 px-2 text-sm hover:bg-gray-100"
          >
            取消
          </Button>
        </div>
        
        <div className="relative">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的回复..."
            className="min-h-[80px] max-h-[160px] resize-none focus-visible:ring-pink-500 bg-white/50 transition-all duration-200 ease-in-out hover:bg-white/80 focus:bg-white pr-[90px]"
          />
          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            size="sm"
            className="absolute right-2 bottom-2 bg-pink-500 hover:bg-pink-600 transition-all duration-200 ease-in-out hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}