import { useParams } from "react-router-dom"
import { ProductInfo } from "@/components/product/ProductInfo"
import { ProductGallery } from "@/components/product/ProductGallery"
import { RelatedProducts } from "@/components/product/RelatedProducts"
import { Navigation } from "@/components/Navigation"
import { useToast } from "@/hooks/use-toast"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { useEffect } from "react"
import { setLoading, setError } from "@/store/productSlice"
import { Skeleton } from "@/components/ui/skeleton"

const ProductDetail = () => {
  const { id } = useParams()
  const { toast } = useToast()
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state: RootState) => state.product)

  const product = products.find(p => p.id.toString() === id)

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(setLoading(true))
      dispatch(setError(null))
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (!product) {
          throw new Error("商品不存在")
        }
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : "加载失败"))
        toast({
          variant: "destructive",
          description: "加载商品信息失败，请稍后重试",
        })
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchProduct()
  }, [dispatch, id, product, toast])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <Navigation />
        <div className="container mx-auto px-4 pt-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <Navigation />
        <div className="container mx-auto px-4 pt-20">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {error || "商品不存在"}
            </h2>
            <p className="text-gray-500">
              请检查商品链接是否正确，或返回首页浏览其他商品
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navigation />
      <div className="container mx-auto px-4 pt-20">
        <div className="grid md:grid-cols-2 gap-8">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
        <RelatedProducts />
      </div>
    </div>
  )
}

export default ProductDetail