import { useParams } from "react-router-dom"
import { ProductInfo } from "@/components/product/ProductInfo"
import { ProductGallery } from "@/components/product/ProductGallery"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { useEffect } from "react"
import { setLoading, setError } from "@/store/productSlice"

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
  const { id } = useParams();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product)

  const product = products.find(p => p.id.toString() === id)

  useEffect(() => {
    dispatch(setLoading(true))
    // 模拟API调用
    setTimeout(() => {
      if (!product) {
        dispatch(setError("商品不存在"))
        toast({
          variant: "destructive",
          description: "加载商品信息失败，请稍后重试",
        })
      }
      dispatch(setLoading(false))
    }, 1000)
  }, [dispatch, id, product, toast])

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      <div className="container mx-auto px-4 pt-20">
        <div className="grid md:grid-cols-2 gap-8">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
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
      </div>
    </div>
  )
}

export default PostDetail;