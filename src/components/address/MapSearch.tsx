import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
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
  const [loading, setLoading] = useState(false)
  const autocompleteRef = useRef<any>(null)

  useEffect(() => {
    if (window.BMap) {
      autocompleteRef.current = new window.BMap.Autocomplete({
        input: "suggestId",
        location: "全国"
      })
    }
  }, [])

  const handleSearch = async () => {
    if (!searchValue.trim()) return
    
    setLoading(true)
    try {
      autocompleteRef.current?.setInputValue(searchValue)
      autocompleteRef.current?.addEventListener('onconfirm', function(e: any) {
        const _value = e.item.value
        const province = _value.province
        const city = _value.city
        const district = _value.district
        const street = _value.street
        const streetNumber = _value.streetNumber
        
        onAddressSelect({
          province,
          city,
          district,
          detail: `${street}${streetNumber}`
        })
        
        setOpen(false)
      })
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="suggestId"
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
              {suggestions.map((item, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setSearchValue(item.value)
                    handleSearch()
                  }}
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{item.value}</div>
                    <div className="text-sm text-gray-500">{item.address}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}