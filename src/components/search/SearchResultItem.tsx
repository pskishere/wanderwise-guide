import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Heart, MessageCircle, Store, Tag } from "lucide-react"
import { SearchResult } from "@/types/search"

interface SearchResultItemProps {
  result: SearchResult
  onClick: (result: SearchResult) => void
}

export const SearchResultItem = ({ result, onClick }: SearchResultItemProps) => {
  if (result.type === 'post') {
    return (
      <Card 
        className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        onClick={() => onClick(result)}
      >
        <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
          <img 
            src={result.image} 
            alt={result.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            loading="lazy"
          />
        </div>
        <div className="px-2 pt-4 pb-3">
          <h3 className="text-sm font-medium line-clamp-2 mb-4">{result.title}</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <img src={result.author?.avatar} alt={result.author?.name} />
              </Avatar>
              <span className="text-xs text-gray-500">{result.author?.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs text-gray-500">{result.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs text-gray-500">{result.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card 
      className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => onClick(result)}
    >
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <img 
          src={result.image} 
          alt={result.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
      </div>
      <div className="px-2 pt-4 pb-3">
        <h3 className="text-sm font-medium line-clamp-2 mb-2">{result.title}</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-600 font-medium">{result.price}</span>
            <span className="text-xs text-gray-400">已售{result.sales}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-gray-400" />
            <div className="flex gap-2">
              {result.tags?.map((tag, index) => (
                <span key={index} className="text-xs text-gray-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Store className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs text-gray-500">{result.shop}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}