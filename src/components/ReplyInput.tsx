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
    <div className="space-y-3 bg-gray-50 p-3 rounded-xl">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`回复 @${replyTo}...`}
        className="min-h-[80px] resize-none focus-visible:ring-pink-500 bg-white"
      />
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="xs"
          className="h-7 px-2 text-xs"
          onClick={onCancel}
          className="hover:bg-gray-100"
        >
          取消
        </Button>
        <Button
          size="xs"
          className="h-7 px-2 text-xs"
          onClick={handleSubmit}
          className="bg-pink-500 hover:bg-pink-600"
        >
          发送
        </Button>
      </div>
    </div>
  )
}