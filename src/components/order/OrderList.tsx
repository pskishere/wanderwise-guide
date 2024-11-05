import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OrderSkeleton } from "./OrderSkeleton"
import { Image } from "@/components/ui/image"
import { Link, useNavigate } from "react-router-dom"

interface OrderItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  specs?: string[]
}

interface Order {
  id: string
  status: string
  totalAmount: number
  items: OrderItem[]
  createdAt: string
}

interface OrderListProps {
  orders: Order[]
  isLoading: boolean
}

export const OrderList = ({ orders, isLoading }: OrderListProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(2).fill(0).map((_, i) => (
          <OrderSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">订单号：{order.id}</div>
            <div className="text-sm font-medium text-pink-600">{order.status}</div>
          </div>

          {order.items.map((item) => (
            <div key={item.id} className="flex gap-3 py-3 border-t">
              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  fallback="https://placehold.co/600x600/png?text=商品图片"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium leading-tight line-clamp-2">{item.title}</h3>
                {item.specs && item.specs.length > 0 && (
                  <div className="mt-1">
                    <span className="text-xs px-1.5 py-0.5 bg-gray-50 rounded-sm text-gray-900">
                      {item.specs[0]}
                    </span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-500">¥</span>
                    <span className="font-medium">{item.price}</span>
                  </div>
                  <div className="text-sm text-gray-500">x{item.quantity}</div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="text-sm text-gray-500">
              共{order.items.reduce((sum, item) => sum + item.quantity, 0)}件商品
              <span className="mx-2">实付</span>
              <span className="text-base font-medium text-gray-900">¥{order.totalAmount}</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                查看详情
              </Button>
              {order.status === "待付款" && (
                <Button size="sm" className="bg-pink-500 hover:bg-pink-600">立即付款</Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}