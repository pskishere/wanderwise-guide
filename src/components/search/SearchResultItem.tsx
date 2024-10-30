import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Heart, MessageCircle, Store, Tag } from "lucide-react"
import { SearchResult } from "@/types/search"

interface SearchResultItemProps {
  result: SearchResult
  onClick: (result: SearchResult) => void
}

export const SearchResultItem = ({ result, onClick }: SearchResultItemProps) => {
  return (
    <Card 
      className="mb-4 break-inside-avoid overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => onClick(result)}
    >
      <div className="relative bg-gray-200 aspect-[3/4]">
        <img 
          src={result.image} 
          alt={result.title}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
      </div>
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
  )
}