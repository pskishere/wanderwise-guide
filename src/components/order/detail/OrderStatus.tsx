import { Package } from "lucide-react"

interface OrderStatusProps {
  status: string
  id: string
  createdAt: string
}

export const OrderStatus = ({ status, id, createdAt }: OrderStatusProps) => {
  return (
    <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <Package className="h-6 w-6" />
        <span className="text-lg font-medium">{status}</span>
      </div>
      <div className="text-pink-100 text-sm space-y-1">
        <p>订单号：{id}</p>
        <p>下单时间：{createdAt}</p>
      </div>
    </div>
  )
}