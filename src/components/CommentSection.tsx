import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CommentItem, CommentType } from "./CommentItem"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface CommentSectionProps {
  comments: CommentType[]
  commentCount: number
}

export const CommentSection = ({ comments: initialComments, commentCount }: CommentSectionProps) => {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
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

  const handleReply = (parentId: number, content: string) => {
    const reply: CommentType = {
      id: Date.now(),
      author: {
        name: "我",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
      },
      content,
      time: "刚刚",
      likes: 0
    }

    const updateComments = (comments: CommentType[]): CommentType[] => {
      return comments.map(comment => {
        if (comment.id === parentId) {
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
    <div className="mx-4 mt-4">
      <h2 className="font-medium mb-4">评论 {commentCount}</h2>
      <ScrollArea className="h-[400px] rounded-md">
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

      {/* Comment Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg">
        <div className="flex gap-2 max-w-lg mx-auto">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="说点什么..."
            className="min-h-[40px] max-h-[120px] focus:ring-pink-500"
          />
          <Button 
            onClick={handleAddComment}
            className="bg-pink-500 hover:bg-pink-600"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}