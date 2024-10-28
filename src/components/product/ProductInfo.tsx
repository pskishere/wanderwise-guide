import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ShoppingCart, Heart, Store, Shield, Package, Truck, Award } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { SpecsDrawer } from "./SpecsDrawer"
import { Badge } from "@/components/ui/badge"

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
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-pink-50 text-pink-600 hover:bg-pink-100">
            限时优惠
          </Badge>
          <Badge variant="secondary" className="bg-orange-50 text-orange-600 hover:bg-orange-100">
            新品上市
          </Badge>
        </div>
        
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
          <span className="text-xs px-2 py-1 bg-pink-50 text-pink-600 rounded-full">
            省¥{Number(product.originalPrice.slice(1)) - Number(product.price.slice(1))}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50/50 to-transparent rounded-xl border border-pink-100">
        <Avatar className="h-12 w-12 ring-2 ring-pink-500/20">
          <img src={product.shop.avatar} alt={product.shop.name} className="object-cover" />
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium">{product.shop.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Award className="h-3.5 w-3.5 text-pink-500" />
            <p className="text-xs text-gray-500">官方认证店铺</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 rounded-full px-4 border-pink-200 hover:bg-pink-50">
          <Store className="h-4 w-4 text-pink-500" />
          进店逛逛
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 py-4">
        <div className="flex flex-col items-center gap-2 p-3 bg-gray-50/50 rounded-xl">
          <Shield className="h-5 w-5 text-pink-500" />
          <span className="text-xs text-gray-600">正品保证</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 bg-gray-50/50 rounded-xl">
          <Package className="h-5 w-5 text-pink-500" />
          <span className="text-xs text-gray-600">极速发货</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 bg-gray-50/50 rounded-xl">
          <Truck className="h-5 w-5 text-pink-500" />
          <span className="text-xs text-gray-600">全国包邮</span>
        </div>
      </div>

      <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl">
        <h2 className="font-medium flex items-center gap-2">
          <span className="h-4 w-1 bg-pink-500 rounded-full"></span>
          商品详情
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 rounded-full border-pink-200 hover:bg-pink-50"
          onClick={() => {
            setIsLiked(!isLiked)
            toast({
              description: isLiked ? "已取消收藏" : "已收藏",
            })
          }}
        >
          <Heart
            className={`h-5 w-5 mr-2 transition-colors ${isLiked ? "fill-pink-500 text-pink-500" : "text-pink-500"}`}
          />
          收藏
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-pink-500 hover:bg-pink-600 rounded-full shadow-lg shadow-pink-500/20"
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