import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { useState } from "react"

const PostDetail = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const post = {
    id: 1,
    title: "京都和服体验｜超详细攻略，体验最正宗的日本文化",
    content: "今天给大家分享一下京都和服体验！和服体验是来日本旅游必打卡的项目之一，可以说是来日本旅游的必备体验。今天我就给大家详细介绍一下在京都体验和服的全过程，包括选择店铺、预约方式、价格、穿着过程等等...",
    images: [
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
      "https://images.unsplash.com/photo-1493997181344-712f2f19d87a?w=800&q=80",
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80"
    ],
    author: {
      name: "樱花妹",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
    },
    likes: 3421,
    comments: 234
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Image Gallery */}
      <div className="relative w-full aspect-square bg-black">
        <img
          src={post.images[0]}
          alt={post.title}
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          1/4
        </div>
      </div>

      {/* Content */}
      <Card className="mx-4 -mt-6 relative z-10 rounded-xl border-none">
        <div className="p-4">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <img src={post.author.avatar} alt={post.author.name} className="object-cover" />
            </Avatar>
            <div>
              <h3 className="font-medium">{post.author.name}</h3>
              <p className="text-xs text-gray-500">2024-02-20</p>
            </div>
            <Button variant="default" size="sm" className="ml-auto">
              关注
            </Button>
          </div>

          {/* Post Content */}
          <h1 className="text-lg font-bold mb-2">{post.title}</h1>
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            {post.content}
          </p>

          {/* Interaction Buttons */}
          <div className="flex items-center justify-around pt-4 border-t">
            <button
              className="flex flex-col items-center gap-1"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-500'}`} />
              <span className="text-xs text-gray-500">{post.likes}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <MessageCircle className="h-6 w-6 text-gray-500" />
              <span className="text-xs text-gray-500">{post.comments}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <Share2 className="h-6 w-6 text-gray-500" />
              <span className="text-xs text-gray-500">分享</span>
            </button>
            <button
              className="flex flex-col items-center gap-1"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark className={`h-6 w-6 ${isSaved ? 'fill-pink-500 text-pink-500' : 'text-gray-500'}`} />
              <span className="text-xs text-gray-500">收藏</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PostDetail