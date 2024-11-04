import { Button } from "@/components/ui/button"
import { CommentItem, CommentType } from "./CommentItem"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"

interface CommentSectionProps {
  comments: CommentType[]
  commentCount: number
}

export const CommentSection = ({ comments: initialComments, commentCount }: CommentSectionProps) => {
  const [comments, setComments] = useState(initialComments)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const loadMoreComments = async () => {
    if (isLoading || !hasMore) return
    
    setIsLoading(true)
    try {
      // 模拟API调用加载更多评论
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const moreComments: CommentType[] = Array(5).fill(null).map((_, index) => ({
        id: Date.now() + index,
        author: {
          name: `用户${Math.floor(Math.random() * 1000)}`,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
        },
        content: `这是第${page}页的评论 ${index + 1}`,
        time: "3小时前",
        likes: Math.floor(Math.random() * 100)
      }))

      if (moreComments.length < 5) {
        setHasMore(false)
      }

      setComments(prev => [...prev, ...moreComments])
      setPage(prev => prev + 1)
    } catch (error) {
      toast({
        variant: "destructive",
        description: "加载评论失败，请稍后重试",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const { ref } = useInfiniteScroll({
    hasNextPage: hasMore,
    isFetchingNextPage: isLoading,
    fetchNextPage: loadMoreComments
  })

  const handleReply = async (parentId: number, content: string) => {
    const newReply: CommentType = {
      id: Date.now(),
      author: {
        name: "当前用户",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
      },
      content,
      time: "刚刚",
      likes: 0
    }

    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          }
        }
        return comment
      })
    )

    toast({
      description: "回复成功",
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
          const updatedReplies = comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.likes + 1
              }
            }
            return reply
          })
          return {
            ...comment,
            replies: updatedReplies
          }
        }
        return comment
      })
    }

    setComments(updateComments(comments))
  }

  return (
    <div className="mx-4 mt-4 pb-24">
      <h2 className="font-medium mb-4">评论 {commentCount}</h2>
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

      {isLoading && (
        <div className="text-center py-4 text-gray-500">
          加载中...
        </div>
      )}

      <div ref={ref} className="h-4" />
    </div>
  )
}