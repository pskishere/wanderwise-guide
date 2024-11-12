import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ShoppingCart, Heart, Store, Shield, Package, Truck, Award, MessageCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { SpecsDrawer } from "./SpecsDrawer"
import { Badge } from "@/components/ui/badge"
import MarkdownPreview from '@uiw/react-markdown-preview'
import { useNavigate } from "react-router-dom"

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

const adContent = `
## 🌟 限时特惠活动

![春季新品发布会](https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80)

### 活动详情
- 🎉 新品上市特惠
- 🎁 限时赠送精美礼品
- 💝 VIP会员额外95折

### 产品亮点
1. 精选优质面料
2. 专业设计师打造
3. 舒适透气

![产品工艺展示](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80)

> 温馨提示：活动期间商品售完即止，请尽快购买！
`

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

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
            省¥{Number(product.originalPrice.slice(1)) - Number(product.price.slice(1))}
          </span>
        </div>
      </div>

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

      <Button
        variant="ghost"
        className="w-full justify-between py-6 hover:bg-gray-50"
        onClick={() => navigate("comments")}
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-gray-500" />
          <span className="text-gray-900">商品评论</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">查看全部</span>
          <span className="text-sm text-gray-300">›</span>
        </div>
      </Button>

      <div className="space-y-1.5 bg-gray-50/50 rounded-lg">
        <h2 className="font-medium flex items-center gap-1.5 text-base">
          <span className="h-3 w-1 bg-pink-500 rounded-full"></span>
          商品详情
        </h2>
      </div>

      <div className="bg-white rounded-lg p-3">
        <MarkdownPreview 
          source={product.richDescription || adContent}
          className="prose prose-pink max-w-none prose-img:rounded-lg prose-img:shadow-md"
        />
      </div>

      <SpecsDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={product}
      />
    </div>
  )
}