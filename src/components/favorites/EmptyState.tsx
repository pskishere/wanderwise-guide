import { Heart } from "lucide-react"

interface EmptyStateProps {
  type: "posts" | "products"
}

export const EmptyState = ({ type }: EmptyStateProps) => {
  return (
    <div className="py-12 flex flex-col items-center gap-4 text-gray-500">
      <Heart className="h-12 w-12 stroke-1" />
      <p>暂无{type === "posts" ? "帖子" : "商品"}收藏</p>
    </div>
  )
}