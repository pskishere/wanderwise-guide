import { cn } from "@/lib/utils"

interface OrderStatusBadgeProps {
  status: string
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "待付款":
        return "bg-yellow-100 text-yellow-800"
      case "待发货":
        return "bg-blue-100 text-blue-800"
      case "待收货":
        return "bg-purple-100 text-purple-800"
      case "已完成":
        return "bg-green-100 text-green-800"
      case "已取消":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      getStatusColor(status)
    )}>
      {status}
    </span>
  )
}