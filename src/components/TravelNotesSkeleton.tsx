import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const TravelNotesSkeleton = () => {
  return (
    <div className="container mx-auto px-2 py-4">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <Card key={index} className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none">
            <Skeleton className="w-full aspect-[3/4]" />
            <div className="px-2 pt-4 pb-3">
              <Skeleton className="h-4 w-3/4 mb-4" />
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
    </div>
  )
}