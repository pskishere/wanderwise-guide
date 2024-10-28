import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { BookmarkIcon, ShoppingBagIcon, Heart, Store } from "lucide-react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface FavoritePost {
  id: number
  title: string
  image: string
  author: {
    name: string
    avatar: string
  }
  likes: number
}

interface FavoriteProduct {
  id: number
  title: string
  price: string
  image: string
  shop: string
}

const fetchFavorites = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    posts: [
      {
        id: 1,
        title: "京都和服体验｜超详细攻略",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        author: {
          name: "樱花妹",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
        },
        likes: 3421
      },
      {
        id: 2,
        title: "大阪美食地图｜带你吃遍关西必打卡的美食",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        author: {
          name: "美食家",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&q=80"
        },
        likes: 2156
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
        title: "春季新款针织开衫",
        price: "¥399",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
        shop: "UNIQLO官方旗舰店"
      }
    ]
  }
}

const PostSkeleton = () => (
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

const ProductSkeleton = () => (
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

const EmptyState = ({ type }: { type: "posts" | "products" }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <BookmarkIcon className="h-12 w-12 mb-4 text-gray-400" />
    <p className="text-gray-500">
      {type === "posts" ? "暂无收藏的游记" : "暂无收藏的商品"}
    </p>
  </div>
)

const Favorites = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">我的收藏</h1>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full h-12 bg-white/50 backdrop-blur-sm sticky top-16 z-10 p-1 gap-1 rounded-xl">
            <TabsTrigger 
              value="posts" 
              className="w-1/2 h-10 data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-lg transition-all duration-300 text-sm font-medium"
            >
              <div className="flex items-center gap-2">
                <BookmarkIcon className="w-4 h-4" />
                游记
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="w-1/2 h-10 data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-lg transition-all duration-300 text-sm font-medium"
            >
              <div className="flex items-center gap-2">
                <ShoppingBagIcon className="w-4 h-4" />
                商品
              </div>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="posts" className="focus-visible:outline-none">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(6).fill(0).map((_, i) => <PostSkeleton key={i} />)}
                </div>
              ) : !data?.posts.length ? (
                <EmptyState type="posts" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.posts.map((post: FavoritePost) => (
                    <Link to={`/posts/${post.id}`} key={post.id}>
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 bg-white/50 backdrop-blur-sm h-full">
                        <AspectRatio ratio={4/3}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                        <div className="p-3">
                          <h3 className="font-medium line-clamp-2 mb-2">{post.title}</h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-sm text-gray-500">{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-pink-500">
                              <Heart className="h-4 w-4 fill-current" />
                              <span className="text-sm">{post.likes}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="products" className="focus-visible:outline-none">
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array(8).fill(0).map((_, i) => <ProductSkeleton key={i} />)}
                </div>
              ) : !data?.products.length ? (
                <EmptyState type="products" />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.products.map((product: FavoriteProduct) => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 bg-white/50 backdrop-blur-sm h-full">
                        <AspectRatio ratio={1}>
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                        <div className="p-3">
                          <h3 className="text-sm font-medium line-clamp-2 mb-2">{product.title}</h3>
                          <p className="text-pink-600 font-medium">{product.price}</p>
                          <div className="flex items-center gap-1 mt-1.5">
                            <Store className="h-3 w-3 text-gray-400" />
                            <p className="text-xs text-gray-500">{product.shop}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  )
}

export default Favorites
