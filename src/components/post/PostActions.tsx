import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface PostActionsProps {
  likes: number
  commentCount: number
}

export const PostActions = ({ likes, commentCount }: PostActionsProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      description: isLiked ? "已取消点赞" : "已点赞",
    })
  }

  const handleShare = () => {
    toast({
      description: "分享链接已复制",
    })
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      description: isSaved ? "已取消收藏" : "已收藏",
    })
  }

  return (
    <div className="flex items-center justify-around pt-4 border-t">
      <button
        className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
        onClick={handleLike}
      >
        <Heart className={`h-6 w-6 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-500'}`} />
        <span className="text-xs text-gray-500">{likes}</span>
      </button>
      <button className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
        <MessageCircle className="h-6 w-6 text-gray-500" />
        <span className="text-xs text-gray-500">{commentCount}</span>
      </button>
      <button 
        className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
        onClick={handleShare}
      >
        <Share2 className="h-6 w-6 text-gray-500" />
        <span className="text-xs text-gray-500">分享</span>
      </button>
      <button
        className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
        onClick={handleSave}
      >
        <Bookmark className={`h-6 w-6 ${isSaved ? 'fill-pink-500 text-pink-500' : 'text-gray-500'}`} />
        <span className="text-xs text-gray-500">收藏</span>
      </button>
    </div>
  )
}