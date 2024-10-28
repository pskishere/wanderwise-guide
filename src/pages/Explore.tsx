import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { useState, useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchProducts, Product, PageData } from "@/services/api"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"
import { useToast } from "@/hooks/use-toast"
import { ShoppingBag, Tag, Store } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const categories = [
  { id: "all", name: "全部" },
  { id: "clothing", name: "服饰" },
  { id: "beauty", name: "美妆" },
  { id: "digital", name: "数码" },
  { id: "food", name: "美食" },
  { id: "home", name: "家居" },
]

const ProductSkeleton = () => (
  <Card className="mb-2 break-inside-avoid overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200">
    <Skeleton className="w-full aspect-square" />
    <CardContent className="p-3">
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-2" />
      <Skeleton className="h-3 w-1/4" />
    </CardContent>
  </Card>
)

export const Explore = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const { ref, inView } = useInView()
  const { toast } = useToast()
  const navigate = useNavigate()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery<PageData<Product>>({
    queryKey: ['products', activeCategory],
    queryFn: ({ pageParam = 0 }) => fetchProducts(activeCategory, pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isError) {
    toast({
      variant: "destructive",
      description: "加载商品失败，请稍后重试",
    })
  }

  const allProducts = data?.pages.flatMap(page => page.items) || []

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Categories */}
      <div className="container mx-auto px-3 pt-24 pb-1 max-w-7xl">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="rounded-full text-sm h-8 px-3"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-2 py-4 max-w-7xl">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {isLoading ? (
            Array(8).fill(0).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            allProducts.map((product) => (
              <Card 
                key={product.id} 
                className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full object-cover"
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

        <div
          ref={ref}
          className="flex justify-center py-4"
        >
          {isFetchingNextPage && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Explore