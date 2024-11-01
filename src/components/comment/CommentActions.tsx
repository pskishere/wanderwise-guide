import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface CommentActionsProps {
  likes: number
  isLiked: boolean
  onLike: () => void
  onReply: () => void
  showReplyButton?: boolean
}

export const CommentActions = ({ 
  likes, 
  isLiked, 
  onLike, 
  onReply,
  showReplyButton = true
}: CommentActionsProps) => {
  return (
    <div className="flex items-center gap-4 mt-2">
      <button 
        className={`flex items-center gap-1 text-sm ${isLiked ? 'text-pink-500' : 'text-gray-500'} hover:text-pink-500 transition-colors`}
        onClick={onLike}
      >
        <Heart className={`h-4 w-4 ${isLiked ? 'fill-pink-500' : ''}`} />
        <span className="text-xs">{likes}</span>
      </button>
      {showReplyButton && (
        <Button 
          variant="ghost" 
          size="sm"
          className="h-6 px-2 text-gray-500 hover:text-pink-500"
          onClick={onReply}
        >
          回复
        </Button>
      )}
    </div>
  )
}