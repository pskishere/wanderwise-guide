import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { OrderList } from "@/components/order/OrderList"
import { EmptyOrders } from "@/components/order/EmptyOrders"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { useState } from "react"
import { OrderStatusToggle } from "@/components/order/OrderStatusToggle"
import { ORDER_STATUSES } from "@/constants/orders"
import { fetchOrders } from "@/services/orderService"

const Orders = () => {
  const { toast } = useToast()
  const [status, setStatus] = useState("all")
  const [statuses, setStatuses] = useState(ORDER_STATUSES)
  
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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
      setStatus(value)
    }
  }

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
          <OrderStatusToggle 
            statuses={statuses}
            currentStatus={status}
            onStatusChange={handleStatusChange}
          />
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