import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/services/api"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"
import { useToast } from "@/hooks/use-toast"
import { Tag, Store } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setLoading, setError, setProducts } from "@/store/productSlice"
import { useEffect } from "react"
import type { Product } from "@/types/product"
import type { PageData } from "@/types/post"

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
  const { ref, inView } = useInView()
  const { toast } = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state: RootState) => state.product)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery<PageData<Product>>({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => fetchProducts('all', pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0
  })

  useEffect(() => {
    if (data?.pages) {
      const allProducts = data.pages.flatMap(page => page.items)
      dispatch(setProducts(allProducts))
    }
  }, [data, dispatch])

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading, dispatch])

  useEffect(() => {
    if (isError) {
      dispatch(setError("加载商品失败"))
      toast({
        variant: "destructive",
        description: "加载商品失败，请稍后重试",
      })
    } else {
      dispatch(setError(null))
    }
  }, [isError, dispatch, toast])

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-2 py-20 max-w-7xl">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {loading ? (
            Array(8).fill(0).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            products.map((product) => (
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
                    <span className="text-red-600 font-medium">{product.price}</span>
                    <span className="text-xs text-gray-400">已售{product.sales}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Store className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{product.shop.name}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div ref={ref} className="flex justify-center py-4">
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
