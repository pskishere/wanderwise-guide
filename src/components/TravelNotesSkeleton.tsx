import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const TravelNotesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((index) => (
        <Card key={index} className="overflow-hidden border-none shadow-sm">
          <Skeleton className="w-full aspect-[3/2]" />
          <div className="p-4">
            <Skeleton className="h-5 w-3/4 mb-4" />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}