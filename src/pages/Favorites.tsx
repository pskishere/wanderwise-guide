import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

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
  // Simulated API call
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

const Favorites = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites
  })

  if (!data) return null

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">我的收藏</h1>
        
        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList className="w-full">
            <TabsTrigger value="posts" className="flex-1">游记</TabsTrigger>
            <TabsTrigger value="products" className="flex-1">商品</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {data.posts.map((post: FavoritePost) => (
              <Link to={`/posts/${post.id}`} key={post.id}>
                <Card className="flex gap-4 p-4 hover:shadow-lg transition-shadow duration-200">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-2">{post.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm text-gray-500">{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-pink-500">
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </TabsContent>

          <TabsContent value="products" className="grid grid-cols-2 gap-4">
            {data.products.map((product: FavoriteProduct) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
                    <p className="text-pink-600 font-medium mt-2">{product.price}</p>
                    <p className="text-xs text-gray-500 mt-1">{product.shop}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  )
}

export default Favorites