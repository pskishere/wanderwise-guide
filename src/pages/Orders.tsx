import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { OrderList } from "@/components/order/OrderList"
import { EmptyOrders } from "@/components/order/EmptyOrders"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const ORDER_STATUSES = [
  { value: "all", label: "全部" },
  { value: "pending", label: "待付款" },
  { value: "processing", label: "待发货" },
  { value: "shipped", label: "待收货" },
  { value: "completed", label: "已完成" }
]

const fetchOrders = async ({ pageParam = 1, status = "all" }) => {
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const ordersPerPage = 5
  const mockOrders = [
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

  // 根据状态筛选订单
  const filteredOrders = status === "all" 
    ? mockOrders
    : mockOrders.filter(order => {
        switch(status) {
          case "pending": return order.status === "待付款";
          case "processing": return order.status === "待发货";
          case "shipped": return order.status === "待收货";
          case "completed": return order.status === "已完成";
          default: return true;
        }
      });

  const start = (pageParam - 1) * ordersPerPage
  const end = start + ordersPerPage
  const pageOrders = filteredOrders.slice(start, end)
  
  return {
    orders: pageOrders || [],
    nextPage: pageOrders.length === ordersPerPage ? pageParam + 1 : undefined,
    hasMore: pageOrders.length === ordersPerPage
  }
}

const Orders = () => {
  const { toast } = useToast()
  const [status, setStatus] = useState("all")
  
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['orders', status],
    queryFn: ({ pageParam }) => fetchOrders({ pageParam, status }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
  })

  const { ref } = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  })

  const orders = data?.pages.flatMap(page => page.orders) || []

  const handleStatusChange = (value: string) => {
    if (value) {
      setStatus(value);
    }
  };

  if (!orders.length && !isLoading) {
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
          <h1 className="text-2xl font-bold mb-4">我的订单</h1>
          <ToggleGroup 
            type="single" 
            value={status} 
            onValueChange={handleStatusChange}
            className="flex overflow-x-auto pb-2 -mx-4 px-4"
          >
            {ORDER_STATUSES.map(({ value, label }) => (
              <ToggleGroupItem 
                key={value} 
                value={value}
                className="whitespace-nowrap px-4 py-2 rounded-full data-[state=on]:bg-pink-50 data-[state=on]:text-pink-500"
              >
                {label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <OrderList orders={orders} isLoading={isLoading} />
        
        {isFetchingNextPage && (
          <div className="text-center py-4 text-gray-500">
            加载中...
          </div>
        )}
        
        <div ref={ref} className="h-4" />
      </div>

      <BottomNav />
    </div>
  )
}

export default Orders