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
    <div className="flex items-center justify-around py-4 px-4 border-t bg-gray-50/50 relative z-20">
      <button
        className="flex flex-col items-center gap-1.5 transition-all hover:scale-110"
        onClick={handleLike}
      >
        <Heart 
          className={`h-5 w-5 transition-colors ${
            isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-400 hover:text-pink-500'
          }`} 
        />
        <span className={`text-xs ${isLiked ? 'text-pink-500' : 'text-gray-500'}`}>
          {likes}
        </span>
      </button>
      <button className="flex flex-col items-center gap-1.5 transition-all hover:scale-110">
        <MessageCircle className="h-5 w-5 text-gray-400 hover:text-pink-500 transition-colors" />
        <span className="text-xs text-gray-500">{commentCount}</span>
      </button>
      <button 
        className="flex flex-col items-center gap-1.5 transition-all hover:scale-110"
        onClick={handleShare}
      >
        <Share2 className="h-5 w-5 text-gray-400 hover:text-pink-500 transition-colors" />
        <span className="text-xs text-gray-500">分享</span>
      </button>
      <button
        className="flex flex-col items-center gap-1.5 transition-all hover:scale-110"
        onClick={handleSave}
      >
        <Bookmark 
          className={`h-5 w-5 transition-colors ${
            isSaved ? 'fill-pink-500 text-pink-500' : 'text-gray-400 hover:text-pink-500'
          }`}
        />
        <span className={`text-xs ${isSaved ? 'text-pink-500' : 'text-gray-500'}`}>
          收藏
        </span>
      </button>
    </div>
  )
}