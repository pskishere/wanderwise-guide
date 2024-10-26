import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const MessageSkeleton = () => {
  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </Card>
  )
}