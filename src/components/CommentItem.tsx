import { Avatar } from "@/components/ui/avatar"
import { useState } from "react"
import { CommentActions } from "./comment/CommentActions"

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
  onReply: (parentId: number) => void
  onLike: (commentId: number) => void
  level?: number
}

export const CommentItem = ({ comment, onReply, onLike, level = 0 }: CommentItemProps) => {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike(comment.id)
  }

  const showReplyButton = level === 0

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
          
          <CommentActions
            likes={comment.likes}
            isLiked={isLiked}
            onLike={handleLike}
            onReply={() => onReply(comment.id)}
            showReplyButton={showReplyButton}
          />
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && level === 0 && (
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
      )}
    </div>
  )
}