import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { CartList } from "@/components/cart/CartList"
import { CartSummary } from "@/components/cart/CartSummary"
import { EmptyCart } from "@/components/cart/EmptyCart"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

const fetchCartItems = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      title: "猫咪爱砂 植物珍珠砂 木薯猫砂 无尘",
      price: 32,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      quantity: 1,
      shop: "宠物用品店",
      selected: true,
      specs: ["植物珍珠砂【2.5kg*1】"],
      discount: 4.8,
      deadline: "11月11日"
    }
  ]
}

const Cart = () => {
  const { toast } = useToast()
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart-items'],
    queryFn: fetchCartItems
  })

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
        <div className="mb-6">
          <h1 className="text-2xl font-bold">购物车</h1>
        </div>

        <CartList 
          items={cartItems} 
          isLoading={isLoading} 
          onCheckout={handleCheckout}
        />
        {cartItems?.length > 0 && (
          <CartSummary 
            items={cartItems} 
            onCheckout={handleCheckout} 
          />
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default Cart