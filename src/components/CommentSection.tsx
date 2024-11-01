import { ScrollArea } from "@/components/ui/scroll-area"
import { CommentItem, CommentType } from "./CommentItem"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { FloatingInput } from "./comment/FloatingInput"

interface CommentSectionProps {
  comments: CommentType[]
  commentCount: number
}

export const CommentSection = ({ comments: initialComments, commentCount }: CommentSectionProps) => {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<{id: number; name: string} | null>(null)
  const { toast } = useToast()

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast({
        variant: "destructive",
        description: "请输入评论内容",
      })
      return
    }

    const comment: CommentType = {
      id: Date.now(),
      author: {
        name: "我",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
      },
      content: newComment,
      time: "刚刚",
      likes: 0
    }

    setComments([comment, ...comments])
    setNewComment("")
    toast({
      description: "评论发送成功",
    })
  }

  const handleReply = (parentId: number) => {
    const parent = comments.find(c => c.id === parentId)
    if (parent) {
      setReplyTo({
        id: parentId,
        name: parent.author.name
      })
    }
  }

  const handleReplySubmit = () => {
    if (!replyTo || !newComment.trim()) return

    const reply: CommentType = {
      id: Date.now(),
      author: {
        name: "我",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
      },
      content: newComment,
      time: "刚刚",
      likes: 0
    }

    const updateComments = (comments: CommentType[]): CommentType[] => {
      return comments.map(comment => {
        if (comment.id === replyTo.id) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          }
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: updateComments(comment.replies)
          }
        }
        return comment
      })
    }

    setComments(updateComments(comments))
    setNewComment("")
    setReplyTo(null)
    toast({
      description: "回复发送成功",
    })
  }

  const handleLike = (commentId: number) => {
    const updateComments = (comments: CommentType[]): CommentType[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.likes + 1
          }
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: updateComments(comment.replies)
          }
        }
        return comment
      })
    }

    setComments(updateComments(comments))
  }

  return (
    <div className="mx-4 mt-4 pb-32">
      <h2 className="font-medium mb-4">评论 {commentCount}</h2>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onLike={handleLike}
            />
          ))}
        </div>
      </ScrollArea>

      <FloatingInput
        value={newComment}
        onChange={setNewComment}
        onSubmit={replyTo ? handleReplySubmit : handleAddComment}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
      />
    </div>
  )
}