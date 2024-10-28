import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, Bookmark, ChevronLeft } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CommentSection } from "@/components/CommentSection"
import { ImageLightbox } from "@/components/ImageLightbox"

const PostDetail = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()
  const { toast } = useToast()

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
        likes: 45,
        replies: [
          {
            id: 3,
            author: {
              name: "樱花妹",
              avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
            },
            content: "可以直接在官网预约哦，我待会发链接给你~",
            time: "1小时前",
            likes: 12
          }
        ]
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
    commentCount: 234,
    tags: ["旅行", "日本", "京都", "和服"]
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-20 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Image Gallery */}
      <div className="relative w-full aspect-square bg-black">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {post.images.map((image, index) => (
              <CarouselItem key={index}>
                <div 
                  className="flex aspect-square items-center justify-center cursor-zoom-in"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image}
                    alt={`${post.title} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={post.images}
        index={currentImageIndex}
      />

      {/* Content */}
      <Card className="mx-4 -mt-6 relative z-10 rounded-xl border-none shadow-lg">
        <div className="p-4">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10 ring-2 ring-pink-500/20">
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

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Post Content */}
          <h1 className="text-lg font-bold mb-2">{post.title}</h1>
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            {post.content}
          </p>

          {/* Interaction Buttons */}
          <div className="flex items-center justify-around pt-4 border-t">
            <button
              className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
              onClick={handleLike}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-500'}`} />
              <span className="text-xs text-gray-500">{post.likes}</span>
            </button>
            <button className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
              <MessageCircle className="h-6 w-6 text-gray-500" />
              <span className="text-xs text-gray-500">{post.commentCount}</span>
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
        </div>
      </Card>

      {/* Comments */}
      <CommentSection 
        comments={post.comments}
        commentCount={post.commentCount}
      />
    </div>
  )
}

export default PostDetail
