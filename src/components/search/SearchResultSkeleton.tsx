import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const SearchResultSkeleton = () => {
  return (
    <Card className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none">
      <Skeleton className="w-full aspect-[3/4]" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </Card>
  )
}