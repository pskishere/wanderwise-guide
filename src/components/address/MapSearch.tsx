import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Command, CommandEmpty, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
      // 初始化地址自动完成
      autocompleteRef.current = new window.BMap.Autocomplete({
        input: "bmap-search-input",
        location: "全国"
      })

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

      // 监听选择建议地址事件
      autocompleteRef.current.addEventListener('onconfirm', function(e: any) {
        const poi = e.item.value
        
        // 使用本地搜索获取更详细的地址信息
        localSearchRef.current.search(poi.province + poi.city + poi.district + poi.street + poi.business)
      })
    }
  }, [])

  const handleSearch = () => {
    if (!searchValue.trim()) return
    localSearchRef.current?.search(searchValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
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
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="搜索地址..."
              className="pl-8 pr-4 w-full"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[calc(100vw-32px)] sm:w-[500px]" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>未找到相关地址</CommandEmpty>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAddressSelect(suggestion)}
                >
                  <Search className="h-4 w-4 mt-1 text-gray-400" />
                  <div>
                    <div className="font-medium">{suggestion.title}</div>
                    <div className="text-sm text-gray-500">{suggestion.address}</div>
                  </div>
                </div>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}