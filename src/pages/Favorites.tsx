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
    posts: [
      {
        id: 1,
        title: "京都和服体验｜超详细攻略，体验最正宗的日本文化",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        author: {
          name: "樱花妹",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80"
        },
        likes: 3456
      },
      {
        id: 2,
        title: "东京美食地图｜带你吃遍东京必打卡的美食",
        image: "https://images.unsplash.com/photo-1554502078-ef0fc409efce?w=800&q=80",
        author: {
          name: "美食家",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80"
        },
        likes: 2891
      },
      {
        id: 3,
        title: "富士山下的春日物语｜河口湖一日游完全攻略",
        image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80",
        author: {
          name: "摄影师小王",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
        },
        likes: 4567
      },
      {
        id: 4,
        title: "奈良小鹿公园半日游，与萌鹿的悠闲午后时光",
        image: "https://images.unsplash.com/photo-1504195652196-12cf45d3d271?w=800&q=80",
        author: {
          name: "旅行达人",
          avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80"
        },
        likes: 3789
      },
      {
        id: 5,
        title: "大阪环球影城｜哈利波特园区全攻略",
        image: "https://images.unsplash.com/photo-1551801841-ecad875a5142?w=800&q=80",
        author: {
          name: "小魔仙",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
        },
        likes: 5678
      },
      {
        id: 6,
        title: "箱根温泉游记｜享受日式温泉的极致体验",
        image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=800&q=80",
        author: {
          name: "温泉达人",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80"
        },
        likes: 4321
      },
      {
        id: 7,
        title: "秋叶原动漫天堂｜二次元爱好者的购物指南",
        image: "https://images.unsplash.com/photo-1565104781149-275a5391a5fb?w=800&q=80",
        author: {
          name: "二次元控",
          avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&q=80"
        },
        likes: 6789
      },
      {
        id: 8,
        title: "银座购物攻略｜奢侈品折扣季扫货指南",
        image: "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&q=80",
        author: {
          name: "购物狂魔",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
        },
        likes: 3456
      }
    ],
    products: [
      {
        id: 1,
        title: "ZARA 2024春季新款小香风粗花呢外套",
        price: "¥799",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
        shop: "ZARA官方旗舰店"
      },
      {
        id: 2,
        title: "SK-II 神仙水精华液 230ml",
        price: "¥1599",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
        shop: "SK-II官方旗舰店"
      },
      {
        id: 3,
        title: "Apple AirPods Pro 2代 主动降噪",
        price: "¥1799",
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&q=80",
        shop: "Apple官方旗舰店"
      },
      {
        id: 4,
        title: "星巴克 Pike Place 派克市场咖啡豆",
        price: "¥128",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
        shop: "星巴克官方旗舰店"
      },
      {
        id: 5,
        title: "UNIQLO 设计师联名款印花T恤",
        price: "¥199",
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
        shop: "优衣库官方旗舰店"
      },
      {
        id: 6,
        title: "蒂佳婷 DR.JART+ 补水面膜",
        price: "¥169",
        image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=800&q=80",
        shop: "DR.JART+海外旗舰店"
      },
      {
        id: 7,
        title: "NIKE Air Force 1 经典小白鞋",
        price: "¥799",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
        shop: "NIKE官方旗舰店"
      },
      {
        id: 8,
        title: "无印良品 MUJI 简约双肩包",
        price: "¥299",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        shop: "MUJI无印良品旗舰店"
      }
    ]
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