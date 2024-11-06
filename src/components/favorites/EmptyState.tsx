import { BookmarkIcon } from "lucide-react"

interface EmptyStateProps {
  type: "posts" | "products"
}

export const EmptyState = ({ type }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12">
    <BookmarkIcon className="h-12 w-12 mb-4 text-gray-400" />
    <p className="text-gray-500">
      {type === "posts" ? "暂无收藏的游记" : "暂无收藏的商品"}
    </p>
  </div>
)