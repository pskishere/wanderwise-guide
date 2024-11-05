import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { CartList } from "@/components/cart/CartList"
import { CartSummary } from "@/components/cart/CartSummary"
import { EmptyCart } from "@/components/cart/EmptyCart"
import { CartSkeleton } from "@/components/cart/CartSkeleton"
import { useToast } from "@/hooks/use-toast"
import { useQuery } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setItems } from "@/store/cartSlice"
import { setSelectedItems } from "@/store/checkoutSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const fetchCartItems = async () => {
  // 模拟从服务器获取购物车数据
  return [
    {
      id: 1,
      title: "商品1",
      price: 99.99,
      image: "https://placehold.co/600x600/png?text=商品1",
      quantity: 1,
      shop: "商店1",
      selected: false
    },
    {
      id: 2,
      title: "商品2",
      price: 199.99,
      image: "https://placehold.co/600x600/png?text=商品2",
      quantity: 2,
      shop: "商店2",
      selected: false
    }
  ]
}

const Cart = () => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector((state: RootState) => state.cart.items)
  
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart'],
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
        <EmptyCart />
        <BottomNav />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <CartSkeleton />
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 pb-32 max-w-3xl">
        <CartList />
      </div>
      <CartSummary onCheckout={handleCheckout} />
      <BottomNav />
    </div>
  )
}

export default Cart