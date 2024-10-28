import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { OrderList } from "@/components/order/OrderList"
import { EmptyOrders } from "@/components/order/EmptyOrders"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

const fetchOrders = async () => {
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: "ORD001",
      status: "待付款",
      totalAmount: 299,
      items: [
        {
          id: 1,
          title: "日本限定 Hello Kitty 樱花限定版玩偶",
          price: 299,
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
          quantity: 1,
          specs: ["粉色 40cm"]
        }
      ],
      createdAt: "2024-02-20 14:30:00"
    },
    {
      id: "ORD002",
      status: "已完成",
      totalAmount: 398,
      items: [
        {
          id: 2,
          title: "大阪环球影城限定 小黄人公仔套装",
          price: 199,
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&q=80",
          quantity: 2,
          specs: ["经典款 20cm"]
        }
      ],
      createdAt: "2024-02-18 09:15:00"
    }
  ]
}

const Orders = () => {
  const { toast } = useToast()
  
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders
  })

  if (!orders?.length && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 pt-20 max-w-3xl">
          <EmptyOrders />
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">我的订单</h1>
        </div>

        <OrderList orders={orders || []} isLoading={isLoading} />
      </div>

      <BottomNav />
    </div>
  )
}

export default Orders