import { CommentSection } from "@/components/CommentSection"
import { Navigation } from "@/components/Navigation"
import { useParams } from "react-router-dom"

const ProductComments = () => {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation title="商品评论" showBack />
      <div className="container max-w-2xl mx-auto px-4 pt-16 pb-24">
        <CommentSection commentCount={234} />
      </div>
    </div>
  )
}

export default ProductComments