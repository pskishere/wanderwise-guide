import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
      <div className="container max-w-2xl mx-auto px-4 py-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            回复 @{replyTo}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-8 w-8 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2 bg-white">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`回复 @${replyTo}...`}
            className="min-h-[44px] max-h-[120px] resize-none focus-visible:ring-pink-500"
          />
          <Button 
            onClick={handleSubmit}
            className="bg-pink-500 hover:bg-pink-600 px-8 shrink-0"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}