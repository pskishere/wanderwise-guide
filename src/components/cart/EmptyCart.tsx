import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <ShoppingCart className="h-12 w-12 mb-4 stroke-1" />
      <p className="text-sm mb-4">购物车还是空的</p>
      <Link to="/explore">
        <Button variant="outline" size="sm">
          去逛逛
        </Button>
      </Link>
    </div>
  )
}