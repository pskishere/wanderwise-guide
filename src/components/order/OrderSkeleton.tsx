import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export const OrderSkeleton = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="flex gap-3 py-3 border-t">
        <Skeleton className="w-20 h-20 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-2" />
          <div className="flex items-center justify-between mt-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </Card>
  )
}