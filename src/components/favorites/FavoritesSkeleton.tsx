import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export const PostSkeleton = () => (
  <Card className="overflow-hidden">
    <AspectRatio ratio={4/3}>
      <Skeleton className="w-full h-full" />
    </AspectRatio>
    <div className="p-3 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center gap-2">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  </Card>
)

export const ProductSkeleton = () => (
  <Card className="overflow-hidden">
    <AspectRatio ratio={1}>
      <Skeleton className="w-full h-full" />
    </AspectRatio>
    <div className="p-3 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  </Card>
)