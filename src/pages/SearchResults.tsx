import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { SearchResultItem } from "@/components/search/SearchResultItem"
import { SearchResultSkeleton } from "@/components/search/SearchResultSkeleton"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setLoading, setError, filterResults } from "@/store/slices/searchSlice"
import type { SearchResult } from "@/types/search"

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { toast } = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, results } = useSelector((state: RootState) => state.search)

  useEffect(() => {
    const fetchResults = async () => {
      dispatch(setLoading(true))
      try {
        // 使用模拟数据进行过滤
        dispatch(filterResults(query))
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : '加载失败'))
        toast({
          variant: "destructive",
          description: "加载搜索结果失败，请稍后重试",
        })
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchResults()
  }, [query, dispatch, toast])

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

        {results.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-8">
            未找到相关结果
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default SearchResults