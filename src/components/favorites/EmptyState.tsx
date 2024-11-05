import { ShoppingBagIcon } from "lucide-react"

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <ShoppingBagIcon className="h-12 w-12 mb-4 text-gray-400" />
    <p className="text-gray-500">暂无收藏的商品</p>
  </div>
)