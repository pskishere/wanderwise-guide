import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { ImageLightbox } from "@/components/ImageLightbox"
import { PostContent } from "@/components/post/PostContent"
import { PostActions } from "@/components/post/PostActions"
import { PostHeader } from "@/components/post/PostHeader"
import { CommentSection } from "@/components/CommentSection"
import { PromotedProducts } from "@/components/post/PromotedProducts"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { mockProducts } from "@/store/mocks/productMocks"
import { useDispatch, useSelector } from "react-redux"
import { addComment } from "@/store/slices/commentSlice"
import { setLoading, setError, setPost, updateLikes, updateFavorites } from "@/store/slices/postDetailSlice"
import { RootState } from "@/store/store"
import { useParams } from "react-router-dom"

const PostDetail = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [commentContent, setCommentContent] = useState("")
  const { toast } = useToast()
  const dispatch = useDispatch()
  const { id } = useParams()

  const { post, loading, error } = useSelector((state: RootState) => state.postDetail)

  useEffect(() => {
    const fetchPost = async () => {
      dispatch(setLoading(true))
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        dispatch(setPost({
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
            id: 1,
            name: "樱花妹",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
          },
          stats: {
            likes: 3421,
            comments: 234,
            favorites: 156
          },
          tags: ["旅行", "日本", "京都", "和服"],
          createdAt: "2024-02-20"
        }))
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : '加载失败'))
        toast({
          variant: "destructive",
          description: "加载失败，请稍后重试",
        })
      } finally {
        dispatch(setLoading(false))
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id, dispatch, toast])

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

    const newComment = {
      id: Date.now(),
      author: {
        name: "当前用户",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
      },
      content: commentContent,
      time: "刚刚",
      likes: 0
    }

    dispatch(addComment(newComment))

    toast({
      description: "评论发布成功",
    })
    setCommentContent("")
  }

  const handleLike = () => {
    if (post) {
      dispatch(updateLikes(post.stats.likes + 1))
    }
  }

  const handleFavorite = () => {
    if (post) {
      dispatch(updateFavorites(post.stats.favorites + 1))
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">加载中...</div>
  }

  if (error || !post) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">加载失败</div>
  }

  const promotedProducts = mockProducts.slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PostHeader />

      <div className="md:container md:mx-auto md:px-4 md:pt-20">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          {/* Main Content */}
          <div className="md:col-span-8">
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

              <Card className="mx-4 md:mx-0 -mt-8 relative z-10 bg-white rounded-2xl border-none shadow-lg overflow-hidden">
                <PostContent 
                  title={post.title}
                  content={post.content}
                  author={post.author}
                  tags={post.tags}
                />
                <PostActions 
                  likes={post.stats.likes}
                  commentCount={post.stats.comments}
                  onLike={handleLike}
                  onFavorite={handleFavorite}
                />
              </Card>
            </div>

            {/* Mobile Promoted Products */}
            <div className="mt-6 px-4 md:hidden">
              <h2 className="text-base font-medium mb-3 flex items-center">
                <span className="h-3.5 w-1 bg-pink-500 rounded-full mr-2"></span>
                相关推荐
              </h2>
              <PromotedProducts products={promotedProducts} layout="mobile" />
            </div>

            <div className="mt-6">
              <CommentSection 
                commentCount={post.stats.comments}
              />
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block md:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div>
                <h2 className="text-base font-medium mb-3 flex items-center">
                  <span className="h-3.5 w-1 bg-pink-500 rounded-full mr-2"></span>
                  相关推荐
                </h2>
                <PromotedProducts products={promotedProducts} layout="desktop" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={post.images}
        index={currentImageIndex}
      />

      {/* Bottom Comment Bar */}
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