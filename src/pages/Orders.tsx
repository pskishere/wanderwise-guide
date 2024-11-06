import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { OrderList } from "@/components/order/OrderList"
import { EmptyOrders } from "@/components/order/EmptyOrders"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge } from "@/components/ui/badge"

const ORDER_STATUSES = [
  { value: "all", label: "全部", count: 0 },
  { value: "pending", label: "待付款", count: 0 },
  { value: "processing", label: "待发货", count: 0 },
  { value: "shipped", label: "待收货", count: 0 },
  { value: "completed", label: "已完成", count: 0 },
  { value: "cancelled", label: "已取消", count: 0 }
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
    },
    {
      id: "ORD003",
      status: "待发货",
      totalAmount: 599,
      items: [
        {
          id: 3,
          title: "东京迪士尼乐园限定 米奇挂饰",
          price: 599,
          image: "https://images.unsplash.com/photo-1620138546344-7b2c38516edf?w=800&q=80",
          quantity: 1,
          specs: ["金色 15cm"]
        }
      ],
      createdAt: "2024-02-17 16:45:00"
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
          case "cancelled": return order.status === "已取消";
          default: return true;
        }
      });

  const start = (pageParam - 1) * ordersPerPage
  const end = start + ordersPerPage
  const pageOrders = filteredOrders.slice(start, end)
  
  // 计算每个状态的订单数量
  const statusCounts = mockOrders.reduce((acc, order) => {
    const status = order.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 更新状态标签的数量
  ORDER_STATUSES.forEach(status => {
    if (status.value === "all") {
      status.count = mockOrders.length;
    } else {
      status.count = statusCounts[status.label] || 0;
    }
  });
  
  return {
    orders: pageOrders || [],
    nextPage: pageOrders.length === ordersPerPage ? pageParam + 1 : undefined,
    hasMore: pageOrders.length === ordersPerPage,
    statusCounts
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
            className="flex overflow-x-auto pb-2 -mx-4 px-4 gap-2"
          >
            {ORDER_STATUSES.map(({ value, label, count }) => (
              <ToggleGroupItem 
                key={value} 
                value={value}
                className="whitespace-nowrap px-4 py-2 rounded-full data-[state=on]:bg-pink-50 data-[state=on]:text-pink-500 flex items-center gap-1"
              >
                {label}
                {count > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {count}
                  </Badge>
                )}
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