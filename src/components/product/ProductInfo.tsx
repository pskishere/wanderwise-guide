import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ShoppingCart, Heart, Store, Shield, Package } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { SpecsDrawer } from "./SpecsDrawer"

interface ProductInfoProps {
  product: {
    title: string
    price: string
    originalPrice: string
    description: string
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

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { toast } = useToast()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <span className="inline-flex items-center rounded-full bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
          限时优惠
        </span>
        <h1 className="text-xl font-bold tracking-tight leading-relaxed">
          {product.title}
        </h1>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-pink-600 tracking-tight">
            {product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {product.originalPrice}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 py-4 px-4 bg-gray-50/50 rounded-xl">
        <Avatar className="h-12 w-12 ring-2 ring-pink-500/20">
          <img src={product.shop.avatar} alt={product.shop.name} />
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium">{product.shop.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">官方认证店铺</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 rounded-full px-4">
          <Store className="h-4 w-4" />
          进店逛逛
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 py-4">
        <div className="flex items-center gap-2 text-gray-500">
          <Shield className="h-4 w-4" />
          <span className="text-sm">正品保证</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Package className="h-4 w-4" />
          <span className="text-sm">极速发货</span>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-medium">商品详情</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 rounded-full"
          onClick={() => {
            setIsLiked(!isLiked)
            toast({
              description: isLiked ? "已取消收藏" : "已收藏",
            })
          }}
        >
          <Heart
            className={`h-5 w-5 mr-2 ${isLiked ? "fill-pink-500 text-pink-500" : ""}`}
          />
          收藏
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-pink-500 hover:bg-pink-600 rounded-full"
          onClick={() => setIsDrawerOpen(true)}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
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