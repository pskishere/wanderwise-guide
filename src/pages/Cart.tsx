import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { CartList } from "@/components/cart/CartList"
import { CartSummary } from "@/components/cart/CartSummary"
import { EmptyCart } from "@/components/cart/EmptyCart"
import { useQuery } from "@tanstack/react-query"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  shop: string
  selected: boolean
}

const fetchCartItems = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      title: "ZARA 2024春季新款小香风粗花呢外套",
      price: 799,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      quantity: 1,
      shop: "ZARA官方旗舰店",
      selected: true
    },
    {
      id: 2,
      title: "春季新款针织开衫",
      price: 399,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      quantity: 2,
      shop: "UNIQLO官方旗舰店",
      selected: true
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
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        <Navigation />
        <div className="container mx-auto px-4 pt-20">
          <EmptyCart />
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-32">
      <Navigation />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pt-20"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            购物车
          </h1>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
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
      </motion.div>

      <BottomNav />
    </div>
  )
}

export default Cart