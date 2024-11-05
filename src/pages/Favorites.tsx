import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { ProductCard } from "@/components/favorites/ProductCard"
import { ProductSkeleton } from "@/components/favorites/FavoritesSkeleton"
import { EmptyState } from "@/components/favorites/EmptyState"
import { useFavorites } from "@/hooks/useFavorites"

const Favorites = () => {
  const { 
    data, 
    isLoading,
    fetchNextPage, 
    hasNextPage 
  } = useFavorites()

  const allItems = data?.pages.flatMap(page => page.items) || []

  if (isLoading && !allItems.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 pt-20 pb-24 max-w-7xl">
          <h1 className="text-2xl font-bold mb-6">我的收藏</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-24 max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">我的收藏</h1>
        
        {!allItems.length ? (
          <EmptyState type="products" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allItems.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
            
            {isLoading && hasNextPage && (
              <>
                {Array(2).fill(0).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default Favorites