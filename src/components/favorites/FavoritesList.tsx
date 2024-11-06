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
    <div className="space-y-4">
      {data.pages.map((page, i) => (
        <div key={i} className="space-y-4">
          {page.items.map((item) => (
            type === "posts" ? (
              <PostCard key={item.id} post={item} />
            ) : (
              <ProductCard key={item.id} product={item} />
            )
          ))}
        </div>
      ))}
      <div ref={ref} className="h-4" />
    </div>
  )
}