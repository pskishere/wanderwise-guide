import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"
import { ReplyInput } from "./ReplyInput"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface CommentAuthor {
  name: string
  avatar: string
}

export interface CommentType {
  id: number
  author: CommentAuthor
  content: string
  time: string
  likes: number
  replies?: CommentType[]
  level?: number
}

interface CommentItemProps {
  comment: CommentType
  onReply: (parentId: number, content: string) => void
  onLike: (commentId: number) => void
  level?: number
}

export const CommentItem = ({ comment, onReply, onLike, level = 0 }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike(comment.id)
  }

  const handleReply = (content: string) => {
    onReply(comment.id, content)
    setIsReplying(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <img 
          src={comment.author.avatar} 
          alt={comment.author.name} 
          className="h-8 w-8 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">{comment.author.name}</span>
            <span className="text-xs text-gray-500">{comment.time}</span>
          </div>
          <p className="text-sm mt-1 break-words">{comment.content}</p>
          <div className="flex items-center gap-4 mt-2">
            <button 
              className={`flex items-center gap-1 text-sm ${isLiked ? 'text-pink-500' : 'text-gray-500'} hover:text-pink-500 transition-colors`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-pink-500' : ''}`} />
              <span className="text-xs">{comment.likes}</span>
            </button>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-6 px-2 text-gray-500 hover:text-pink-500"
              onClick={() => setIsReplying(true)}
            >
              回复
            </Button>
          </div>
        </div>
      </div>

      {isReplying && (
        <ReplyInput 
          onSubmit={handleReply}
          onCancel={() => setIsReplying(false)}
          replyTo={comment.author.name}
        />
      )}

      {comment.replies && comment.replies.length > 0 && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm text-gray-500 hover:text-pink-500 pl-11"
            >
              {isOpen ? "收起" : `展开 ${comment.replies.length} 条回复`}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-10 space-y-4 border-l-2 border-gray-100 pl-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onLike={onLike}
                  level={level + 1}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}