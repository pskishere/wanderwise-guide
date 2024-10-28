import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ShoppingCart, Heart, Store } from "lucide-react"
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight leading-relaxed">
          {product.title}
        </h1>
        <div className="flex items-baseline gap-3 mt-3">
          <span className="text-3xl font-bold text-pink-600 tracking-tight">
            {product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {product.originalPrice}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 py-4 border-t border-b">
        <Avatar className="h-10 w-10">
          <img src={product.shop.avatar} alt={product.shop.name} />
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium">{product.shop.name}</h3>
          <p className="text-sm text-gray-500">官方认证店铺</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Store className="h-4 w-4" />
          进店逛逛
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="font-medium">商品详情</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
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
          className="flex-1 bg-pink-500 hover:bg-pink-600"
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