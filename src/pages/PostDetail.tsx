import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ImageLightbox } from "@/components/ImageLightbox"
import { PostHeader } from "@/components/post/PostHeader"
import { PostContent } from "@/components/post/PostContent"
import { PostActions } from "@/components/post/PostActions"
import { CommentSection } from "@/components/CommentSection"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const PostDetail = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
      <PostHeader />

      <div className="relative">
        <div className="w-full aspect-[4/3] bg-black">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {post.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div 
                    className="flex aspect-[4/3] items-center justify-center cursor-zoom-in"
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

        <Card className="mx-4 -mt-8 relative z-10 bg-white rounded-2xl border-none shadow-lg overflow-hidden">
          <PostContent 
            title={post.title}
            content={post.content}
            author={post.author}
            tags={post.tags}
          />
          <PostActions 
            likes={post.likes}
            commentCount={post.commentCount}
          />
        </Card>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={post.images}
        index={currentImageIndex}
      />

      <div className="mt-6">
        <CommentSection 
          comments={post.comments}
          commentCount={post.commentCount}
        />
      </div>

      {/* Add bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg animate-in slide-in-from-bottom duration-300">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-3">
            <Input
              placeholder="写评论..."
              className="rounded-full focus-visible:ring-pink-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail