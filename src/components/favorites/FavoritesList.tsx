import { useInfiniteScroll } from "@/hooks"
import { useFavorites } from "@/hooks/useFavorites"
import { PostCard } from "./PostCard"
import { ProductCard } from "./ProductCard"
import { EmptyState } from "./EmptyState"
import { FavoritesSkeleton } from "./FavoritesSkeleton"

interface FavoritesListProps {
  type: "posts" | "products"
}

export const FavoritesList = ({ type }: FavoritesListProps) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useFavorites(type)
  const { ref } = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })
  
  if (isLoading) {
    return <FavoritesSkeleton />
  }
  
  if (!data?.pages[0]?.items.length) {
    return <EmptyState type={type} />
  }
  
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {data.pages.map((page, i) => (
        <div key={i}>
          {page.items.map((item) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              {type === "posts" ? (
                <PostCard post={item} />
              ) : (
                <ProductCard product={item} />
              )}
            </div>
          ))}
        </div>
      ))}
      <div ref={ref} className="h-4" />
    </div>
  )
}