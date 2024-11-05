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
  replyTo?: string
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
          <p className="text-sm mt-1 break-words">
            {comment.replyTo && (
              <span className="text-pink-500">回复 @{comment.replyTo}：</span>
            )}
            {comment.content}
          </p>
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
        <div className="space-y-4">
          {/* Always show the first reply */}
          <CommentItem
            key={comment.replies[0].id}
            comment={{
              ...comment.replies[0],
              replyTo: comment.author.name
            }}
            onReply={onReply}
            onLike={onLike}
            level={level + 1}
          />
          
          {/* Show collapse button only if there are more than 1 replies */}
          {comment.replies.length > 1 && (
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm text-gray-500 hover:text-pink-500 pl-0"
                >
                  {isOpen ? "收起" : `展开 ${comment.replies.length - 1} 条回复`}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-4 mt-4">
                  {comment.replies.slice(1).map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={{
                        ...reply,
                        replyTo: comment.author.name
                      }}
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
      )}
    </div>
  )
}