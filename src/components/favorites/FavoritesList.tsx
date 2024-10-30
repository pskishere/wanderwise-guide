import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Heart, Store } from "lucide-react"
import { PostSkeleton, ProductSkeleton } from "./FavoritesSkeleton"
import { EmptyState } from "./EmptyState"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

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

interface FavoritesListProps {
  type: "posts" | "products"
  items: FavoritePost[] | FavoriteProduct[]
  isLoading: boolean
  hasNextPage?: boolean
  fetchNextPage: () => void
}

export const FavoritesList = ({ 
  type, 
  items, 
  isLoading,
  hasNextPage,
  fetchNextPage 
}: FavoritesListProps) => {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isLoading, fetchNextPage])

  if (isLoading && !items.length) {
    return (
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {Array(6).fill(0).map((_, i) => (
          type === 'posts' ? <PostSkeleton key={i} /> : <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!items.length) {
    return <EmptyState type={type} />
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {items.map((item) => (
          type === 'posts' ? (
            <Link to={`/posts/${item.id}`} key={item.id}>
              <Card className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200">
                <img
                  src={(item as FavoritePost).image}
                  alt={(item as FavoritePost).title}
                  className="w-full object-cover"
                />
                <div className="px-2 pt-4 pb-3">
                  <h3 className="text-sm font-medium line-clamp-2 mb-4">
                    {(item as FavoritePost).title}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={(item as FavoritePost).author.avatar}
                        alt={(item as FavoritePost).author.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-gray-500">
                        {(item as FavoritePost).author.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {(item as FavoritePost).likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ) : (
            <Link to={`/products/${item.id}`} key={item.id}>
              <Card className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200">
                <img
                  src={(item as FavoriteProduct).image}
                  alt={(item as FavoriteProduct).title}
                  className="w-full object-cover"
                />
                <div className="px-2 pt-4 pb-3">
                  <h3 className="text-sm font-medium line-clamp-2 mb-2">
                    {(item as FavoriteProduct).title}
                  </h3>
                  <p className="text-pink-600 font-medium">
                    {(item as FavoriteProduct).price}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Store className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500">
                      {(item as FavoriteProduct).shop}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          )
        ))}
      </div>
      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-8">
          {isLoading && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {Array(2).fill(0).map((_, i) => (
                type === 'posts' ? <PostSkeleton key={i} /> : <ProductSkeleton key={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}