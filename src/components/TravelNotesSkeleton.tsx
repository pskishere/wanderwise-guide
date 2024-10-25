import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const TravelNotesSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <Card key={index} className="overflow-hidden border-none shadow-sm">
            <Skeleton className="w-full aspect-[3/4]" />
            <div className="p-2">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-3">
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