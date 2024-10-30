import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "react-router-dom"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchResult {
  id: number
  title: string
  image: string
  type: "post" | "product"
  author?: {
    name: string
    avatar: string
  }
  price?: string
  shop?: string
}

const fetchSearchResults = async ({ pageParam = 1, queryKey }: any) => {
  const [_, query] = queryKey
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const itemsPerPage = 12
  const start = (pageParam - 1) * itemsPerPage
  const end = start + itemsPerPage

  // 模拟搜索结果数据
  const allResults = Array.from({ length: 50 }, (_, i): SearchResult => {
    const isPost = i % 2 === 0
    return {
      id: i + 1,
      title: isPost 
        ? `${query}相关的旅行游记 ${i + 1}`
        : `${query}相关的商品 ${i + 1}`,
      image: `https://source.unsplash.com/random/800x${1000 + i}?${query}`,
      type: isPost ? "post" : "product",
      ...(isPost 
        ? {
            author: {
              name: "旅行者",
              avatar: `https://source.unsplash.com/random/100x100?portrait&${i}`
            }
          }
        : {
            price: "¥" + Math.floor(Math.random() * 1000 + 100),
            shop: "官方旗舰店"
          }
      )
    }
  })

  return {
    items: allResults.slice(start, end),
    nextPage: end < allResults.length ? pageParam + 1 : undefined
  }
}

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const { ref, inView } = useInView()

  const { 
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['search', query],
    queryFn: fetchSearchResults,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const allResults = data?.pages.flatMap(page => page.items) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-24 max-w-7xl">
        <h1 className="text-lg font-medium mb-6">
          {query} 的搜索结果
        </h1>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <Card key={i} className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none">
                <Skeleton className="w-full aspect-[3/4]" />
                <div className="p-3">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </Card>
            ))
          ) : (
            allResults.map((item) => (
              <Card 
                key={item.id} 
                className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-medium line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  {item.type === "post" ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={item.author?.avatar}
                        alt={item.author?.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-gray-500">
                        {item.author?.name}
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="text-pink-600 font-medium mb-1">{item.price}</p>
                      <p className="text-xs text-gray-500">{item.shop}</p>
                    </>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        <div
          ref={ref}
          className="flex justify-center py-8"
        >
          {isFetchingNextPage && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {Array(4).fill(0).map((_, i) => (
                <Card key={i} className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none">
                  <Skeleton className="w-full aspect-[3/4]" />
                  <div className="p-3">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default SearchResults