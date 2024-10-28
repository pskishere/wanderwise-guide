import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookmarkIcon, ShoppingBagIcon } from "lucide-react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { FavoritesList } from "@/components/favorites/FavoritesList"

const fetchFavorites = async ({ pageParam = 1 }) => {
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const itemsPerPage = 6
  const start = (pageParam - 1) * itemsPerPage
  const end = start + itemsPerPage

  const allItems = {
    posts: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: "京都和服体验｜超详细攻略",
      image: `https://images.unsplash.com/photo-${1528360983277 + i}-13d401cdc186?w=800&q=80`,
      author: {
        name: "樱花妹",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
      },
      likes: 3421 + i
    })),
    products: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: "ZARA 2024春季新款小香风粗花呢外套",
      price: "¥799",
      image: `https://images.unsplash.com/photo-${1591047139829 + i}-d91aecb6caea?w=800&q=80`,
      shop: "ZARA官方旗舰店"
    }))
  }

  const hasNextPage = end < allItems.posts.length

  return {
    items: allItems.posts.slice(start, end),
    products: allItems.products.slice(start, end),
    nextPage: hasNextPage ? pageParam + 1 : undefined
  }
}

const Favorites = () => {
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage 
  } = useInfiniteQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1
  })

  const allItems = data?.pages.flatMap(page => page.items) || []
  const allProducts = data?.pages.flatMap(page => page.products) || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">我的收藏</h1>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full h-10 bg-white/90 backdrop-blur-sm sticky top-16 z-10 p-0.5 gap-0.5 rounded-xl shadow-sm">
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
                items={allProducts}
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