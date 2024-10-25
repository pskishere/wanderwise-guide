import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingBag, Tag, Store } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/services/api"
import { Skeleton } from "@/components/ui/skeleton"

const categories = [
  { id: "all", name: "全部" },
  { id: "clothing", name: "服饰" },
  { id: "beauty", name: "美妆" },
  { id: "digital", name: "数码" },
  { id: "food", name: "美食" },
  { id: "home", name: "家居" },
]

const ProductSkeleton = () => (
  <Card className="overflow-hidden border-none shadow-sm">
    <Skeleton className="w-full aspect-square" />
    <CardContent className="p-3">
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-2" />
      <Skeleton className="h-3 w-1/4" />
    </CardContent>
  </Card>
)

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState("all")

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', activeCategory],
    queryFn: () => fetchProducts(activeCategory)
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex w-full gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="搜索商品..." 
                className="pl-10 bg-gray-100"
              />
            </div>
            <Button variant="outline" size="icon">
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="rounded-full whitespace-nowrap"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            products?.map((product) => (
              <Card key={product.id} className="overflow-hidden border-none shadow-sm">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full aspect-square object-cover"
                />
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Tag className="h-3 w-3 text-gray-400" />
                    <div className="flex gap-2">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="text-xs text-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-pink-600 font-medium">{product.price}</span>
                    <span className="text-xs text-gray-400">已售{product.sales}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Store className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{product.shop}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Explore