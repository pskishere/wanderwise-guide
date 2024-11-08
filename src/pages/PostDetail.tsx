import { Card } from "@/components/ui/card"
import { ImageLightbox } from "@/components/ImageLightbox"
import { PostContent } from "@/components/post/PostContent"
import { PostActions } from "@/components/post/PostActions"
import { PostHeader } from "@/components/post/PostHeader"
import { CommentSection } from "@/components/CommentSection"
import { PromotedProducts } from "@/components/post/PromotedProducts"
import { PostGalleryCarousel } from "@/components/post/PostGalleryCarousel"
import { PostCommentBar } from "@/components/post/PostCommentBar"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { mockProducts } from "@/store/mocks/productMocks"
import { useDispatch } from "react-redux"
import { addComment } from "@/store/slices/commentSlice"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchPostById } from "@/services/postsApi"

const PostDetail = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [commentContent, setCommentContent] = useState("")
  const { toast } = useToast()
  const dispatch = useDispatch()
  const { id } = useParams()

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id as string),
    enabled: !!id
  })

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

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">加载中...</div>
  }

  if (isError || !post) {
    toast({
      variant: "destructive",
      description: "加载失败，请稍后重试",
    })
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">加载失败</div>
  }

  const promotedProducts = mockProducts.slice(0, 4).map(product => ({
    id: product.id,
    title: product.title,
    price: `¥${product.price}`,
    image: product.images[0]
  }))

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PostHeader />

      <div className="md:container md:mx-auto md:px-4 md:pt-20">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <div className="relative">
              <PostGalleryCarousel 
                images={post.images}
                title={post.title}
                onImageClick={handleImageClick}
              />

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
                  onLike={() => {}}
                  onFavorite={() => {}}
                />
              </Card>
            </div>

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

      <PostCommentBar
        commentContent={commentContent}
        onCommentChange={setCommentContent}
        onSubmit={handleSubmitComment}
      />
    </div>
  )
}

export default PostDetail