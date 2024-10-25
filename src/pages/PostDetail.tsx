import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, Bookmark, ChevronLeft } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

const PostDetail = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [comment, setComment] = useState("")
  const navigate = useNavigate()

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
    comments: [
      {
        id: 1,
        author: {
          name: "旅行达人",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
        },
        content: "太详细了！请问预约是在哪个网站呢？",
        time: "2小时前",
        likes: 45
      },
      {
        id: 2,
        author: {
          name: "美食家",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&q=80"
        },
        content: "收藏了！下个月去京都一定要体验一下",
        time: "3小时前",
        likes: 23
      }
    ],
    commentCount: 234
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-20 bg-black/30 p-2 rounded-full text-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Image Gallery */}
      <div className="relative w-full aspect-square bg-black">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {post.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="flex aspect-square items-center justify-center">
                  <img
                    src={image}
                    alt={`${post.title} - ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
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
              <span className="text-xs text-gray-500">{post.commentCount}</span>
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

      {/* Comments Section */}
      <div className="mx-4 mt-4">
        <h2 className="font-medium mb-4">评论 {post.commentCount}</h2>
        <ScrollArea className="h-[400px] rounded-md">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 mb-4">
              <Avatar className="h-8 w-8">
                <img src={comment.author.avatar} alt={comment.author.name} className="object-cover" />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{comment.author.name}</span>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
                <div className="flex items-center gap-1 mt-2">
                  <button className="flex items-center gap-1 text-gray-500">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{comment.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Comment Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
          <div className="flex gap-2 max-w-lg mx-auto">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="说点什么..."
              className="min-h-[40px] max-h-[120px]"
            />
            <Button>发送</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail