import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"
import { ReplyInput } from "./ReplyInput"

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
}

interface CommentItemProps {
  comment: CommentType
  onReply: (parentId: number, content: string) => void
  onLike: (commentId: number) => void
}

export const CommentItem = ({ comment, onReply, onLike }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

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
        <Avatar className="h-8 w-8">
          <img src={comment.author.avatar} alt={comment.author.name} className="object-cover" />
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{comment.author.name}</span>
            <span className="text-xs text-gray-500">{comment.time}</span>
          </div>
          <p className="text-sm mt-1">{comment.content}</p>
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
              className="text-gray-500 h-6 px-2 hover:text-pink-500"
              onClick={() => setIsReplying(!isReplying)}
            >
              回复
            </Button>
          </div>
          
          {isReplying && (
            <div className="mt-2">
              <ReplyInput 
                onSubmit={handleReply}
                onCancel={() => setIsReplying(false)}
                replyTo={comment.author.name}
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10 space-y-4 border-l-2 border-gray-100 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
            />
          ))}
        </div>
      )}
    </div>
  )
}