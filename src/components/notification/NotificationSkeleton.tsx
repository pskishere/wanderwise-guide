import { Skeleton } from "@/components/ui/skeleton"

export function NotificationSkeleton() {
  return (
    <div className="p-5 flex items-start gap-5">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}