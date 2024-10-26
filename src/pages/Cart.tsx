import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { CartHeader } from "@/components/cart/CartHeader"
import { CartItem } from "@/components/cart/CartItem"
import { CartSummary } from "@/components/cart/CartSummary"
import { EmptyCart } from "@/components/cart/EmptyCart"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"

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
      title: "【新品上市】小米14 Pro 徕卡光学镜头 骁龙8Gen3",
      price: 4999,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      quantity: 1,
      shop: "小米官方旗舰店",
      selected: true
    },
    {
      id: 2,
      title: "【限时特惠】Nike Air Jordan 1 AJ1 乔丹高帮篮球鞋",
      price: 1299,
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
      quantity: 1,
      shop: "Nike官方旗舰店",
      selected: true
    },
    {
      id: 3,
      title: "【新年礼盒】SK-II 神仙水精华液套装 230ml",
      price: 1580,
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
      quantity: 2,
      shop: "SK-II官方旗舰店",
      selected: true
    },
    {
      id: 4,
      title: "【春季新款】UNIQLO设计师联名款oversize卫衣",
      price: 299,
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80",
      quantity: 1,
      shop: "优衣库官方旗舰店",
      selected: false
    },
    {
      id: 5,
      title: "【限量发售】星巴克樱花季限定保温杯",
      price: 299,
      image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&q=80",
      quantity: 1,
      shop: "星巴克官方旗舰店",
      selected: true
    }
  ]
}

const Cart = () => {
  const { toast } = useToast()
  const [items, setItems] = useState<CartItem[]>([])
  
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart-items'],
    queryFn: fetchCartItems
  })

  useEffect(() => {
    if (cartItems) {
      setItems(cartItems)
    }
  }, [cartItems])

  const isAllSelected = items.length > 0 && items.every(item => item.selected)

  const handleSelectAll = (checked: boolean) => {
    setItems(prev => prev.map(item => ({ ...item, selected: checked })))
    toast({
      description: checked ? "已全选商品" : "已取消全选",
    })
  }

  const handleSelect = (id: number, checked: boolean) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: checked } : item
    ))
  }

  const handleQuantityChange = (id: number, type: 'increase' | 'decrease') => {
    setItems(prev => prev.map(item => 
      item.id === id ? {
        ...item,
        quantity: type === 'increase' ? item.quantity + 1 : item.quantity - 1
      } : item
    ))
    toast({
      description: type === 'increase' ? "商品数量已增加" : "商品数量已减少",
    })
  }

  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
    toast({
      description: "商品已从购物车中移除",
    })
  }

  const handleCheckout = () => {
    toast({
      description: "正在跳转到结算页面...",
    })
  }

  if (!items?.length && !isLoading) {
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
        <CartHeader 
          onSelectAll={handleSelectAll}
          isAllSelected={isAllSelected}
        />

        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onSelect={handleSelect}
                onQuantityChange={handleQuantityChange}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>

        {items?.length > 0 && (
          <CartSummary 
            items={items} 
            onCheckout={handleCheckout}
          />
        )}
      </motion.div>

      <BottomNav />
    </div>
  )
}

export default Cart