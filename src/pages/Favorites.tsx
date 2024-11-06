import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FavoritesList } from "@/components/favorites/FavoritesList"
import { FavoritesHeader } from "@/components/favorites/FavoritesHeader"

const Favorites = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <FavoritesHeader />
      
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">帖子收藏</TabsTrigger>
            <TabsTrigger value="products">商品收藏</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <FavoritesList type="posts" />
          </TabsContent>
          
          <TabsContent value="products">
            <FavoritesList type="products" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Favorites