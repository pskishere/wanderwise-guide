import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookmarkIcon, ShoppingBagIcon } from "lucide-react"
import { FavoritesList } from "./FavoritesList"
import { useFavorites } from "@/hooks/useFavorites"

interface FavoritesHeaderProps {
  defaultValue: string;
}

export const FavoritesHeader = ({ defaultValue }: FavoritesHeaderProps) => {
  const { 
    data: products, 
    isLoading: isProductsLoading,
    fetchNextPage: fetchNextProducts,
    hasNextPage: hasNextProducts
  } = useFavorites()

  const allProducts = products?.pages.flatMap(page => page.items) || []

  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="w-full h-10 bg-white/90 backdrop-blur-sm sticky top-20 z-10 p-0.5 gap-0.5 rounded-xl shadow-sm">
        <TabsTrigger 
          value="posts" 
          className="w-1/2 h-9 data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=inactive]:text-gray-700 rounded-lg transition-all duration-300 text-xs font-medium"
        >
          <div className="flex items-center gap-2">
            <BookmarkIcon className="w-4 h-4" />
            游记
          </div>
        </TabsTrigger>
        <TabsTrigger 
          value="products" 
          className="w-1/2 h-9 data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=inactive]:text-gray-700 rounded-lg transition-all duration-300 text-xs font-medium"
        >
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="w-4 h-4" />
            商品
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="mt-4">
        <FavoritesList 
          type="posts"
          items={[]}
          isLoading={false}
          hasNextPage={false}
          fetchNextPage={() => {}}
        />
      </TabsContent>

      <TabsContent value="products" className="mt-4">
        <FavoritesList 
          type="products"
          items={allProducts}
          isLoading={isProductsLoading}
          hasNextPage={hasNextProducts}
          fetchNextPage={fetchNextProducts}
        />
      </TabsContent>
    </Tabs>
  )
}