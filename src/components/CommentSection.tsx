import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { CommentItem, CommentType } from "./CommentItem"
import { useState, useEffect, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { ReplyDrawer } from "./comment/ReplyDrawer"

interface CommentSectionProps {
  comments: CommentType[]
  commentCount: number
}

export const CommentSection = ({ comments: initialComments, commentCount }: CommentSectionProps) => {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<{id: number; name: string} | null>(null)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()

  // 监听键盘弹出和收起
  useEffect(() => {
    const handleResize = () => {
      const isKeyboard = window.innerHeight < window.outerHeight * 0.85
      setIsKeyboardVisible(isKeyboard)
      
      // 当键盘弹出时，滚动到输入框
      if (isKeyboard && textareaRef.current) {
        setTimeout(() => {
          textareaRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    if (!replyTo) return

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

      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg transition-transform duration-200 ${
          isKeyboardVisible ? 'translate-y-0' : 'translate-y-0'
        }`}
        style={{
          paddingBottom: isKeyboardVisible ? '0px' : 'env(safe-area-inset-bottom, 0px)'
        }}
      >
        <div className="flex gap-2 max-w-lg mx-auto p-4">
          <textarea
            ref={textareaRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="说点什么..."
            className="flex-1 resize-none rounded-xl border border-gray-200 p-3 text-sm focus:border-pink-500 focus:outline-none min-h-[44px] max-h-[120px]"
            rows={1}
            onFocus={() => {
              if (textareaRef.current) {
                setTimeout(() => {
                  textareaRef.current?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }
            }}
          />
          <Button 
            onClick={handleAddComment}
            className="rounded-full bg-pink-500 hover:bg-pink-600 px-8 shrink-0"
          >
            发送
          </Button>
        </div>
      </div>

      <ReplyDrawer
        isOpen={!!replyTo}
        onClose={() => setReplyTo(null)}
        onSubmit={handleReplySubmit}
        replyTo={replyTo?.name || ""}
      />
    </div>
  )
}