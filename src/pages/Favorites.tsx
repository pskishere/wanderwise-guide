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
      title: [
        "京都和服体验｜超详细攻略，体验最正宗的日本文化",
        "东京美食地图｜带你吃遍东京必打卡的美食",
        "富士山下的春日物语｜河口湖一日游完全攻略",
        "奈良小鹿公园半日游，与萌鹿的悠闲午后时光",
        "大阪环球影城｜哈利波特园区全攻略",
        "箱根温泉游记｜享受日式温泉的极致体验"
      ][i % 6],
      image: `https://source.unsplash.com/random/800x${1000 + i}?japan,travel`,
      author: {
        name: ["樱花妹", "旅行达人", "美食家", "摄影师", "背包客", "旅游博主"][i % 6],
        avatar: `https://source.unsplash.com/random/100x100?portrait&${i}`
      },
      likes: Math.floor(Math.random() * 5000) + 1000
    })),
    products: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: [
        "ZARA 2024春季新款小香风粗花呢外套",
        "SK-II 神仙水精华液 230ml",
        "Apple AirPods Pro 2代 主动降噪",
        "星巴克 Pike Place 派克市场咖啡豆",
        "UNIQLO 设计师联名款印花T恤",
        "蒂佳婷 DR.JART+ 补水面膜"
      ][i % 6],
      price: ["¥799", "¥1599", "¥1799", "¥128", "¥199", "¥169"][i % 6],
      image: `https://source.unsplash.com/random/800x800?product&${i}`,
      shop: [
        "ZARA官方旗舰店",
        "SK-II官方旗舰店",
        "Apple官方旗舰店",
        "星巴克官方旗舰店",
        "优衣库官方旗舰店",
        "DR.JART+海外旗舰店"
      ][i % 6]
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
        <h1 className="text-2xl font-bold">我的收藏</h1>
        
        <Tabs defaultValue="posts" className="w-full">
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