import { ScrollArea } from "@/components/ui/scroll-area"
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
  const [replyTo, setReplyTo] = useState<{id: number; name: string} | null>(null)
  const [inputHeight, setInputHeight] = useState(44)
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

  const handleReplySubmit = (content: string) => {
    if (!replyTo || !content.trim()) return

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

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value)
    const textarea = e.target
    textarea.style.height = 'auto'
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 44), 120)
    setInputHeight(newHeight)
    textarea.style.height = `${newHeight}px`
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

      <div className="fixed inset-x-0 bottom-0 bg-white border-t shadow-lg">
        <div className="flex gap-2 max-w-lg mx-auto p-4 pb-[calc(env(safe-area-inset-bottom,_0px)_+_1rem)]">
          {replyTo ? (
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  回复 @{replyTo.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyTo(null)}
                  className="h-6 px-2 text-sm hover:bg-gray-100"
                >
                  取消
                </Button>
              </div>
              <textarea
                value={newComment}
                onChange={handleTextareaChange}
                placeholder="说点什么..."
                className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm focus:border-pink-500 focus:outline-none"
                style={{ height: `${inputHeight}px` }}
                rows={1}
              />
            </div>
          ) : (
            <textarea
              value={newComment}
              onChange={handleTextareaChange}
              placeholder="说点什么..."
              className="flex-1 resize-none rounded-xl border border-gray-200 p-3 text-sm focus:border-pink-500 focus:outline-none"
              style={{ height: `${inputHeight}px` }}
              rows={1}
            />
          )}
          <Button 
            onClick={replyTo ? () => handleReplySubmit(newComment) : handleAddComment}
            className="rounded-full bg-pink-500 hover:bg-pink-600 px-8 shrink-0 self-end"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}