import { Button } from "@/components/ui/button"
import { Heart, Shield, Package, Truck, Award, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { SpecsDrawer } from "./SpecsDrawer"
import { Badge } from "@/components/ui/badge"
import MarkdownPreview from '@uiw/react-markdown-preview'

interface ProductInfoProps {
  product: {
    title: string
    price: string
    originalPrice: string
    description: string
    richDescription?: string
    image: string
    shop: {
      name: string
      avatar: string
    }
    specs: Array<{
      name: string
      options: string[]
    }>
  }
}

const ProductFeatures = () => (
  <div className="grid grid-cols-3 gap-1.5">
    <div className="flex flex-col items-center gap-0.5 p-1.5 bg-gray-50/50 rounded-lg">
      <Shield className="h-4 w-4 text-pink-500" />
      <span className="text-xs text-gray-600">正品保证</span>
    </div>
    <div className="flex flex-col items-center gap-0.5 p-1.5 bg-gray-50/50 rounded-lg">
      <Package className="h-4 w-4 text-pink-500" />
      <span className="text-xs text-gray-600">极速发货</span>
    </div>
    <div className="flex flex-col items-center gap-0.5 p-1.5 bg-gray-50/50 rounded-lg">
      <Truck className="h-4 w-4 text-pink-500" />
      <span className="text-xs text-gray-600">全国包邮</span>
    </div>
  </div>
)

const ProductDescription = ({ description }: { description: string }) => (
  <div className="space-y-1.5 bg-gray-50/50 p-2 rounded-lg">
    <h2 className="font-medium flex items-center gap-1.5 text-sm">
      <span className="h-3 w-0.5 bg-pink-500 rounded-full"></span>
      商品详情
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed">
      {description}
    </p>
  </div>
)

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { toast } = useToast()

  const originalPrice = Number(product.originalPrice.slice(1))
  const currentPrice = Number(product.price.slice(1))
  const discount = originalPrice - currentPrice

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="bg-pink-50 text-pink-600 hover:bg-pink-100">
            限时优惠
          </Badge>
          <Badge variant="secondary" className="bg-orange-50 text-orange-600 hover:bg-orange-100">
            新品上市
          </Badge>
        </div>
        
        <h1 className="text-lg font-bold tracking-tight leading-relaxed">
          {product.title}
        </h1>
        
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-pink-600 tracking-tight">
            {product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {product.originalPrice}
          </span>
          <span className="text-xs px-1.5 py-0.5 bg-pink-50 text-pink-600 rounded-full">
            省¥{discount}
          </span>
        </div>
      </div>

      <ProductFeatures />

      <ProductDescription description={product.description} />

      {product.richDescription && (
        <div className="bg-white rounded-lg p-4">
          <MarkdownPreview 
            source={product.richDescription}
            className="prose prose-pink max-w-none prose-img:rounded-lg prose-img:shadow-md"
          />
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 rounded-full border-pink-200 hover:bg-pink-50 h-9"
          onClick={() => {
            setIsLiked(!isLiked)
            toast({
              description: isLiked ? "已取消收藏" : "已收藏",
            })
          }}
        >
          <Heart
            className={`h-4 w-4 mr-1.5 transition-colors ${isLiked ? "fill-pink-500 text-pink-500" : "text-pink-500"}`}
          />
          收藏
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-pink-500 hover:bg-pink-600 rounded-full shadow-lg shadow-pink-500/20 h-9"
          onClick={() => setIsDrawerOpen(true)}
        >
          <ShoppingCart className="h-4 w-4 mr-1.5" />
          加入购物车
        </Button>
      </div>

      <SpecsDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={product}
      />
    </div>
  )
}