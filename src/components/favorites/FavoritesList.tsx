import { useInfiniteScroll } from "@/hooks"
import { useFavorites } from "@/hooks/useFavorites"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Heart, MessageCircle, Store, Tag } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { FavoritesSkeleton } from "./FavoritesSkeleton"
import { EmptyState } from "./EmptyState"

interface FavoritesListProps {
  type: "posts" | "products"
}

export const FavoritesList = ({ type }: FavoritesListProps) => {
  const navigate = useNavigate()
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useFavorites(type)
  const { ref } = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })
  
  if (isLoading) {
    return <FavoritesSkeleton />
  }
  
  if (!data?.pages[0]?.items.length) {
    return <EmptyState type={type} />
  }

  const allItems = data.pages.flatMap(page => page.items)
  
  return (
    <div className="container mx-auto px-1 py-3">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {allItems.map((item) => (
          <div key={item.id} className="break-inside-avoid mb-4">
            {type === "posts" ? (
              <Card 
                className="bg-white overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => navigate(`/posts/${item.id}`)}
              >
                <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="px-2 pt-4 pb-3">
                  <h3 className="text-sm font-medium line-clamp-2 mb-4">{item.title}</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <img src={item.author?.avatar} alt={item.author?.name} />
                      </Avatar>
                      <span className="text-xs text-gray-500">{item.author?.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card 
                className="bg-white overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => navigate(`/products/${item.id}`)}
              >
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="px-2 pt-4 pb-3">
                  <h3 className="text-sm font-medium line-clamp-2 mb-2">{item.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-red-600 font-medium">{item.price}</span>
                      <span className="text-xs text-gray-400">已售{item.sales || 0}</span>
                    </div>
                    {item.tags && (
                      <div className="flex items-center gap-2">
                        <Tag className="h-3.5 w-3.5 text-gray-400" />
                        <div className="flex gap-2">
                          {item.tags.map((tag, index) => (
                            <span key={index} className="text-xs text-gray-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Store className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">{item.shop || '商城'}</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>

      <div ref={ref} className="h-4" />
      {isFetchingNextPage && <FavoritesSkeleton />}
    </div>
  )
}