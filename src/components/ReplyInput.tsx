import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { X } from "lucide-react"

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
    <div className="fixed inset-x-0 bottom-0 bg-white border-t shadow-lg animate-in slide-in-from-bottom duration-300">
      <div className="container max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">回复</span>
            <span className="text-sm text-pink-500 font-medium">@{replyTo}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-8 w-8 rounded-full hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-3">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`回复 @${replyTo}...`}
            className="rounded-xl focus-visible:ring-pink-500 text-base"
          />
          <Button 
            onClick={handleSubmit}
            className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700 px-8 h-10 rounded-full font-medium text-base shadow-lg hover:shadow-xl transition-all shrink-0"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  );
}