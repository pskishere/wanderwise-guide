import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import { Command, CommandEmpty, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { debounce } from "lodash"

interface MapSearchProps {
  onAddressSelect: (address: {
    province: string
    city: string
    district: string
    detail: string
  }) => void
}

declare global {
  interface Window {
    BMap: any
    BMapLib: any
  }
}

export function MapSearch({ onAddressSelect }: MapSearchProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const autocompleteRef = useRef<any>(null)
  const localSearchRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.BMap) {
      // 初始化本地搜索
      localSearchRef.current = new window.BMap.LocalSearch("全国", {
        onSearchComplete: function(results: any) {
          if (results) {
            const suggestions = []
            for (let i = 0; i < results.getCurrentNumPois(); i++) {
              const poi = results.getPoi(i)
              suggestions.push({
                title: poi.title,
                address: poi.address,
                point: poi.point,
                province: poi.province,
                city: poi.city,
                district: poi.district || ''
              })
            }
            setSuggestions(suggestions)
            setOpen(true)
          }
        }
      })
    }
  }, [])

  // 使用debounce优化搜索，避免频繁请求
  const debouncedSearch = useRef(
    debounce((value: string) => {
      if (value.trim()) {
        localSearchRef.current?.search(value)
      } else {
        setSuggestions([])
        setOpen(false)
      }
    }, 300)
  ).current

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    debouncedSearch(value)
  }

  const handleAddressSelect = (suggestion: any) => {
    onAddressSelect({
      province: suggestion.province,
      city: suggestion.city,
      district: suggestion.district,
      detail: suggestion.address
    })
    setOpen(false)
    setSearchValue(suggestion.title)
  }

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="bmap-search-input"
              value={searchValue}
              onChange={handleInputChange}
              placeholder="搜索地址..."
              className="pl-8 pr-4 w-full"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[calc(100vw-32px)] sm:w-[500px]" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>未找到相关地址</CommandEmpty>
              <div className="max-h-[300px] overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleAddressSelect(suggestion)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50">
                      <MapPin className="h-4 w-4 text-pink-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="text-sm font-medium text-gray-900">{suggestion.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-2">{suggestion.address}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}