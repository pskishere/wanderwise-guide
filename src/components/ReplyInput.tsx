import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AtSign, Smile } from "lucide-react"

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
    <div className="fixed inset-x-0 z-30 bottom-0 bg-white border-t shadow-lg animate-in slide-in-from-bottom duration-300">
      <div className="container max-w-2xl mx-auto px-4 py-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <AtSign className="h-5 w-5 text-gray-400" />
            <Smile className="h-5 w-5 text-gray-400" />
          </div>
          
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`回复 @${replyTo}...`}
            className="pl-20 pr-40 h-12 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-pink-500"
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button
              onClick={handleSubmit}
              className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700 px-6 h-8 rounded-full text-sm"
            >
              发送
            </Button>
            <Button
              variant="ghost"
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 px-6 h-8 rounded-full text-sm"
            >
              取消
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}