import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { FavoritesList } from "@/components/favorites/FavoritesList"
import { FavoritesHeader } from "@/components/favorites/FavoritesHeader"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useFavorites } from "@/hooks/useFavorites"

const Favorites = () => {
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage 
  } = useFavorites()

  const allItems = data?.pages.flatMap(page => page.items) || []
  const allProducts = data?.pages.flatMap(page => page.products) || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-7xl">
        <h1 className="text-2xl font-bold">我的收藏</h1>
        <Tabs defaultValue="posts">
          <FavoritesHeader />

          <div className="mt-6">
            <TabsContent value="posts" className="focus-visible:outline-none">
              <FavoritesList
                type="posts"
                items={allItems}
                isLoading={isLoading}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
              />
            </TabsContent>
            
            <TabsContent value="products" className="focus-visible:outline-none">
              <FavoritesList
                type="products"
                items={allProducts as any} // Type assertion to fix compatibility
                isLoading={isLoading}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  )
}

export default Favorites