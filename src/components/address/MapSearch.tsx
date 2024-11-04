import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import { Command, CommandEmpty, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { debounce } from "lodash"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

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
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const localSearchRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.BMap) {
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
    setSelectedAddress(suggestion.title)
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchValue}
              onChange={handleInputChange}
              placeholder="搜索地址..."
              className="pl-9 pr-4 w-full h-11 text-base"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[calc(100vw-32px)] sm:w-[500px]" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>
                <div className="py-6 text-center text-sm text-gray-500">
                  未找到相关地址
                </div>
              </CommandEmpty>
              <div className="max-h-[300px] overflow-y-auto p-2">
                <RadioGroup value={selectedAddress} onValueChange={() => {}}>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="relative flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => handleAddressSelect(suggestion)}
                    >
                      <RadioGroupItem
                        value={suggestion.title}
                        id={`address-${index}`}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-1">
                        <Label htmlFor={`address-${index}`} className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {suggestion.title}
                          </span>
                          <span className="text-sm text-gray-500 mt-1">
                            {suggestion.address}
                          </span>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}