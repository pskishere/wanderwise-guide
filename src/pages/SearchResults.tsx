import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { SearchResultItem } from "@/components/search/SearchResultItem"
import { SearchResultSkeleton } from "@/components/search/SearchResultSkeleton"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setLoading, setError, setResults } from "@/store/slices/searchSlice"
import type { SearchResult } from "@/types/search"

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
  const dispatch = useDispatch()
  const { loading, error, results } = useSelector((state: RootState) => state.search)

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
    if (data?.pages) {
      const allResults = data.pages.flatMap(page => page.items)
      dispatch(setResults(allResults))
    }
  }, [data, dispatch])

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading, dispatch])

  useEffect(() => {
    if (isError) {
      dispatch(setError("加载搜索结果失败"))
      toast({
        variant: "destructive",
        description: "加载搜索结果失败，请稍后重试",
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
          {loading ? (
            Array(8).fill(0).map((_, index) => (
              <SearchResultSkeleton key={index} />
            ))
          ) : (
            results.map((result) => (
              <SearchResultItem
                key={result.id}
                result={result}
                onClick={handleItemClick}
              />
            ))
          )}
        </div>

        <div ref={ref} className="py-4">
          {isFetchingNextPage && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {Array(4).fill(0).map((_, index) => (
                <SearchResultSkeleton key={index} />
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