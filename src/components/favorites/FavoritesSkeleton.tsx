import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const FavoritesSkeleton = () => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="mb-4 break-inside-avoid">
          <Card className="p-4">
            <div className="flex gap-4">
              <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}