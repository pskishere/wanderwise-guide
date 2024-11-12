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

const ProductDetail = () => {
  const { id } = useParams()
  const { toast } = useToast()
  const dispatch = useDispatch()
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