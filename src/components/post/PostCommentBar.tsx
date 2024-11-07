import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PostCommentBarProps {
  commentContent: string
  onCommentChange: (value: string) => void
  onSubmit: () => void
}

export const PostCommentBar = ({ commentContent, onCommentChange, onSubmit }: PostCommentBarProps) => {
  return (
    <div className="fixed bottom-0 z-20 left-0 right-0 bg-white border-t shadow-lg animate-in slide-in-from-bottom duration-300">
      <div className="container max-w-2xl mx-auto px-4 py-3">
        <div className="flex gap-3">
          <Input
            value={commentContent}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="写评论..."
            className="rounded-full focus-visible:ring-pink-500"
          />
          <Button 
            onClick={onSubmit}
            className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700 px-8 h-10 rounded-full font-medium text-base shadow-lg hover:shadow-xl transition-all shrink-0"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}