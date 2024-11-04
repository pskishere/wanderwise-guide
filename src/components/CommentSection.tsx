import { Button } from "@/components/ui/button"
import { CommentItem, CommentType } from "./CommentItem"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { addComment, addReply, updateLikes } from "@/store/slices/commentSlice"

interface CommentSectionProps {
  commentCount: number
}

export const CommentSection = ({ commentCount }: CommentSectionProps) => {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const dispatch = useDispatch()
  
  const comments = useSelector((state: RootState) => state.comment.comments)

  const loadMoreComments = async () => {
    if (isLoading || !hasMore) return
    
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (page >= 3) {
        setHasMore(false)
      }

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

    dispatch(addReply({ parentId, reply: newReply }))

    toast({
      description: "回复成功",
    })
  }

  const handleLike = (commentId: number) => {
    const findComment = (comments: CommentType[]): CommentType | undefined => {
      for (const comment of comments) {
        if (comment.id === commentId) return comment;
        if (comment.replies) {
          const found = findComment(comment.replies);
          if (found) return found;
        }
      }
    };

    const comment = findComment(comments);
    if (comment) {
      dispatch(updateLikes({ id: commentId, likes: comment.likes + 1 }));
    }
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