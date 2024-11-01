import { Button } from "@/components/ui/button"
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
    <div className="fixed inset-x-0 bottom-0 bg-white border-t shadow-lg">
      <div className="max-w-lg mx-auto p-4 pb-[calc(env(safe-area-inset-bottom,_0px)_+_1rem)] space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`回复 @${replyTo}...`}
          className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm focus:border-pink-500 focus:outline-none min-h-[80px] max-h-[120px]"
          rows={3}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="h-8 px-3 text-sm hover:bg-gray-100"
          >
            取消
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            className="h-8 px-3 text-sm bg-pink-500 hover:bg-pink-600"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}