import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { CartList } from "@/components/cart/CartList"
import { CartSummary } from "@/components/cart/CartSummary"
import { EmptyCart } from "@/components/cart/EmptyCart"
import { useQuery } from "@tanstack/react-query"

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
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart-items'],
    queryFn: fetchCartItems
  })

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
        <h1 className="text-2xl font-bold mb-6">购物车</h1>
        <CartList items={cartItems} isLoading={isLoading} />
        {cartItems?.length > 0 && <CartSummary items={cartItems} />}
      </div>

      <BottomNav />
    </div>
  )
}

export default Cart