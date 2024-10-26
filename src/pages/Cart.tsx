import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { CartList } from "@/components/cart/CartList"
import { CartSummary } from "@/components/cart/CartSummary"
import { EmptyCart } from "@/components/cart/EmptyCart"
import { useQuery } from "@tanstack/react-query"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  shop: string
  selected: boolean
  specs?: string
  discount?: {
    type: string
    value: number
  }
  returnInfo?: string[]
  deadline?: string
}

const fetchCartItems = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      title: "猫咪爱砂 植物珍珠砂 木薯猫砂",
      price: 32,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80",
      quantity: 1,
      shop: "宠物用品官方旗舰店",
      selected: true,
      specs: "规格: 2.5kg*1",
      discount: {
        type: "instant",
        value: 4.8
      },
      returnInfo: ["退货包运费", "7天无理由退货"],
      deadline: "11月11日"
    },
    {
      id: 2,
      title: "UNIQLO 优衣库 春季新款针织开衫 纯棉舒适百搭",
      price: 399,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      quantity: 2,
      shop: "UNIQLO官方旗舰店",
      selected: true,
      specs: "颜色: 浅灰色; 尺码: L"
    }
  ]
}

const Cart = () => {
  const { toast } = useToast()
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart-items'],
    queryFn: fetchCartItems
  })

  const handleSelectAll = (checked: boolean) => {
    toast({
      description: checked ? "已全选商品" : "已取消全选",
    })
  }

  const handleCheckout = () => {
    toast({
      description: "正在跳转到结算页面...",
    })
  }

  if (!cartItems?.length && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 pt-20">
          <EmptyCart />
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">购物车</h1>
          <div className="flex items-center gap-2">
            <Checkbox 
              id="select-all"
              onCheckedChange={handleSelectAll}
              className="h-4 w-4"
            />
            <label htmlFor="select-all" className="text-sm text-gray-500">
              全选
            </label>
          </div>
        </div>

        <CartList 
          items={cartItems} 
          isLoading={isLoading} 
          onCheckout={handleCheckout}
        />
        {cartItems?.length > 0 && <CartSummary items={cartItems} onCheckout={handleCheckout} />}
      </div>

      <BottomNav />
    </div>
  )
}

export default Cart