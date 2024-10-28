import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface TravelNotesSkeletonProps {
  viewMode?: "grid" | "list"
  count?: number
}

export const TravelNotesSkeleton = ({ 
  viewMode = "grid",
  count = 6 
}: TravelNotesSkeletonProps) => {
  return (
    <div className={viewMode === "list" ? "space-y-4" : "columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className={`overflow-hidden mb-4 ${
          viewMode === "list" ? "flex gap-4" : "break-inside-avoid"
        }`}>
          <div className={viewMode === "list" ? "w-48 shrink-0" : ""}>
            <Skeleton className={`w-full ${
              viewMode === "list" ? "h-32" : "aspect-[4/3]"
            }`} />
          </div>
          <div className="p-4 flex-1">
            <Skeleton className="h-4 w-3/4 mb-2" />
            {viewMode === "list" && (
              <div className="space-y-2 mb-4">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}