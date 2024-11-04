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
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

const relatedProducts = [
  {
    id: 2,
    title: "春季新款针织开衫",
    price: "¥399",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80"
  },
  {
    id: 3,
    title: "法式复古连衣裙",
    price: "¥599",
    image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80"
  },
  {
    id: 4,
    title: "高腰阔腿牛仔裤",
    price: "¥459",
    image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80"
  },
  {
    id: 5,
    title: "真丝印花衬衫",
    price: "¥699",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80"
  }
]

const PostDetail = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [commentContent, setCommentContent] = useState("")
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
    commentCount: 234,
    tags: ["旅行", "日本", "京都", "和服"]
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const handleSubmitComment = () => {
    if (!commentContent.trim()) {
      toast({
        description: "请输入评论内容",
      })
      return
    }

    toast({
      description: "评论发布成功",
    })
    setCommentContent("")
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
        <div className="mx-4 mb-6">
          <h2 className="text-lg font-medium mb-4">相关推荐</h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4">
              {relatedProducts.map((product) => (
                <Link 
                  to={`/products/${product.id}`} 
                  key={product.id}
                  className="w-[160px] shrink-0"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full aspect-square object-cover"
                    />
                    <CardContent className="p-3">
                      <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
                      <p className="text-pink-600 font-medium mt-2">{product.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <CommentSection 
          commentCount={post.commentCount}
        />
      </div>

      <div className="fixed bottom-0 z-20 left-0 right-0 bg-white border-t shadow-lg animate-in slide-in-from-bottom duration-300">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-3">
            <Input
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="写评论..."
              className="rounded-full focus-visible:ring-pink-500"
            />
            <Button 
              onClick={handleSubmitComment}
              className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700 px-8 h-10 rounded-full font-medium text-base shadow-lg hover:shadow-xl transition-all shrink-0"
            >
              发送
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail