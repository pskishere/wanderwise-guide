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
    <div className="space-y-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`回复 @${replyTo}...`}
        className="min-h-[60px] focus:ring-pink-500"
      />
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          size="sm"
          className="bg-pink-500 hover:bg-pink-600"
          onClick={handleSubmit}
        >
          发送
        </Button>
      </div>
    </div>
  )
}