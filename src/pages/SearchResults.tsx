import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Heart, MessageCircle, Store, Tag } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

interface SearchResult {
  id: number
  type: 'post' | 'product'
  title: string
  image: string
  price?: string
  sales?: string
  shop?: string
  tags?: string[]
  author?: {
    name: string
    avatar: string
  }
  likes?: number
  comments?: number
}

const fetchSearchResults = async ({ pageParam = 0, queryKey }: any) => {
  const [_, query] = queryKey
  await new Promise(resolve => setTimeout(resolve, 1000))

  const results: SearchResult[] = [
    {
      id: 1,
      type: 'post',
      title: `关于${query}的旅行记录`,
      image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80",
      author: {
        name: "旅行达人",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
      },
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      type: 'product',
      title: `${query}特产礼盒`,
      price: "¥299",
      sales: "2.3k",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      shop: "特产官方旗舰店",
      tags: ["伴手礼", "礼盒"]
    }
  ]

  return {
    items: results,
    nextCursor: pageParam + 1 < 3 ? pageParam + 1 : undefined
  }
}

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
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
  } = useInfiniteQuery({
    queryKey: ['search', query],
    queryFn: fetchSearchResults,
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
      description: "加载搜索结果失败，请稍后重试",
    })
  }

  const allResults = data?.pages.flatMap(page => page.items) || []

  const handleItemClick = (result: SearchResult) => {
    if (result.type === 'post') {
      navigate(`/posts/${result.id}`)
    } else {
      navigate(`/products/${result.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-2 py-20">
        <h2 className="text-lg font-medium mb-4 px-2">"{query}" 的搜索结果</h2>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {isLoading ? (
            Array(8).fill(0).map((_, index) => (
              <Card key={index} className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none">
                <Skeleton className="w-full aspect-[3/4]" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </Card>
            ))
          ) : (
            allResults.map((result) => (
              <Card 
                key={result.id} 
                className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => handleItemClick(result)}
              >
                <img 
                  src={result.image} 
                  alt={result.title}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium mb-3 line-clamp-2">{result.title}</h3>
                  
                  {result.type === 'post' ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <img src={result.author?.avatar} alt={result.author?.name} />
                        </Avatar>
                        <span className="text-sm text-gray-500">{result.author?.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{result.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{result.comments}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-600 font-medium">{result.price}</span>
                        <span className="text-sm text-gray-400">已售{result.sales}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <div className="flex gap-2">
                          {result.tags?.map((tag, index) => (
                            <span key={index} className="text-sm text-gray-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Store className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{result.shop}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        <div ref={ref} className="py-4">
          {isFetchingNextPage && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {Array(4).fill(0).map((_, index) => (
                <Card key={index} className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none">
                  <Skeleton className="w-full aspect-[3/4]" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-4 w-3/4" />
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
