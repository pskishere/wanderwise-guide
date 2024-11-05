import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const ProductSkeleton = () => (
  <Card className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none">
    <Skeleton className="w-full aspect-square" />
    <div className="px-2 pt-4 pb-3">
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <div className="flex items-center gap-1 mt-1.5">
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  </Card>
)