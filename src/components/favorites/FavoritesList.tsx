import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { PostCard } from "./PostCard"
import { ProductCard } from "./ProductCard"
import { PostSkeleton, ProductSkeleton } from "./FavoritesSkeleton"
import { EmptyState } from "./EmptyState"

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      {type === 'posts' ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {items.map((item) => (
            <PostCard key={item.id} {...(item as FavoritePost)} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <ProductCard key={item.id} {...(item as FavoriteProduct)} />
          ))}
        </div>
      )}
      
      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-8">
          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
              {Array(4).fill(0).map((_, i) => (
                type === 'posts' ? <PostSkeleton key={i} /> : <ProductSkeleton key={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}