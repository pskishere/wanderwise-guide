import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const CartSkeleton = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-5 w-5 rounded" />
        <div className="flex flex-1 gap-4">
          <Skeleton className="w-20 h-20 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-6 w-20" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-6 w-8" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}