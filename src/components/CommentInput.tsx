import { Button } from "@/components/ui/button"
import { AtSign, Smile } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export const CommentInput = () => {
  const [content, setContent] = useState("")

  const handleSubmit = () => {
    // TODO: Implement comment submission
    console.log("Submitting comment:", content)
    setContent("")
  }

  return (
    <div className="border rounded-lg p-4 bg-white">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="写下你的评论..."
        className="min-h-[100px] mb-4 resize-none"
      />
      
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <AtSign className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Smile className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setContent("")}
          >
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-pink-500 hover:bg-pink-600"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}