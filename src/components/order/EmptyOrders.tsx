import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const EmptyOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <Package className="h-12 w-12 mb-4 stroke-1" />
      <p className="text-sm mb-4">暂无订单</p>
      <Link to="/explore">
        <Button variant="outline" size="sm">
          去逛逛
        </Button>
      </Link>
    </div>
  )
}