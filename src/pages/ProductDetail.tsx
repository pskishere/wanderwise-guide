import { useParams } from "react-router-dom"
import { ProductInfo } from "@/components/product/ProductInfo"
import { ProductGallery } from "@/components/product/ProductGallery"
import { RelatedProducts } from "@/components/product/RelatedProducts"
import { useToast } from "@/hooks/use-toast"
import { useQuery } from "@tanstack/react-query"
import { fetchProductById } from "@/services/productsApi"
import { Skeleton } from "@/components/ui/skeleton"

const ProductDetail = () => {
  const { id } = useParams()
  const { toast } = useToast()

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    onError: () => {
      toast({
        variant: "destructive",
        description: "加载商品信息失败，请稍后重试",
      })
    }
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="container mx-auto px-4 pt-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-40" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) return null

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