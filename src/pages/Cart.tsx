import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { CartList } from "@/components/cart/CartList"
import { CartSummary } from "@/components/cart/CartSummary"
import { EmptyCart } from "@/components/cart/EmptyCart"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setItems } from "@/store/cartSlice"
import { setSelectedItems } from "@/store/checkoutSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const fetchCartItems = async () => {
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      title: "日本限定 Hello Kitty 樱花限定版玩偶",
      price: 299,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      quantity: 1,
      shop: "三丽鸥官方旗舰店",
      selected: true,
      specs: ["粉色 40cm"],
      discount: 30,
      deadline: "3月1日"
    },
    {
      id: 2,
      title: "大阪环球影城限定 小黄人公仔套装",
      price: 199,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&q=80",
      quantity: 2,
      shop: "环球影城官方店",
      selected: true,
      specs: ["经典款 20cm"],
      discount: 20,
      deadline: "2月28日"
    }
  ]
}

const Cart = () => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector((state: RootState) => state.cart.items)
  
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart-items'],
    queryFn: fetchCartItems
  })

  useEffect(() => {
    if (cartItems) {
      dispatch(setItems(cartItems))
    }
  }, [cartItems, dispatch])

  const handleCheckout = () => {
    const selectedItems = items.filter(item => item.selected)
    if (selectedItems.length === 0) {
      toast({
        variant: "destructive",
        description: "请先选择商品",
      })
      return
    }
    
    dispatch(setSelectedItems(selectedItems))
    navigate('/checkout')
  }

  if (!items?.length && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-1 sm:px-4 pt-20 max-w-3xl">
          <EmptyCart />
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Navigation />
      
      <div className="container mx-auto px-2 sm:px-4 pt-20 max-w-3xl">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">购物车</h1>
        </div>

        <CartList isLoading={isLoading} />
        {items?.length > 0 && (
          <CartSummary onCheckout={handleCheckout} />
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default Cart