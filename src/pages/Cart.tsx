import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { CartList } from "@/components/cart/CartList"
import { CartSummary } from "@/components/cart/CartSummary"
import { EmptyCart } from "@/components/cart/EmptyCart"
import { useToast } from "@/hooks/use-toast"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setItems, setLoading, setError, fetchCartItems } from "@/store/slices/cartSlice"
import { setSelectedItems } from "@/store/slices/checkoutSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector((state: RootState) => state.cart.items)
  const isLoading = useSelector((state: RootState) => state.cart.loading)
  const error = useSelector((state: RootState) => state.cart.error)

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        dispatch(setLoading(true))
        const data = await fetchCartItems()
        dispatch(setItems(data))
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : '加载购物车失败'))
        toast({
          description: "加载购物车失败",
        })
      } finally {
        dispatch(setLoading(false))
      }
    }

    loadCartItems()
  }, [dispatch, toast])

  const handleCheckout = () => {
    const selectedItems = items.filter(item => item.selected)
    if (selectedItems.length === 0) {
      toast({
        description: "请先选择要结算的商品",
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