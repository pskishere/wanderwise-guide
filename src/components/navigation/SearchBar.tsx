import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SearchSuggestions } from "./SearchSuggestions"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const suggestions = {
  destinations: [
    { id: 1, name: "东京", type: "city", desc: "日本最大都市" },
    { id: 2, name: "巴厘岛", type: "city", desc: "印尼度假胜地" },
    { id: 3, name: "巴黎", type: "city", desc: "法国浪漫之都" }
  ],
  foods: [
    { id: 1, name: "寿司", type: "food", desc: "日本传统美食" },
    { id: 2, name: "披萨", type: "food", desc: "意大利风味" },
    { id: 3, name: "牛排", type: "food", desc: "西式料理" }
  ],
  guides: [
    { id: 1, name: "东京购物攻略", type: "guide", desc: "血拼购物指南" },
    { id: 2, name: "巴厘岛潜水指南", type: "guide", desc: "海底探险" },
    { id: 3, name: "巴黎美食地图", type: "guide", desc: "米其林推荐" }
  ]
}

export const SearchBar = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search/results?q=${encodeURIComponent(value.trim())}`)
      setOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchValue)
    }
  }

  return (
    <div className="flex-1 max-w-2xl">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="搜索目的地、美食、攻略..." 
              className="pl-8 bg-gray-100 border-0 rounded-2xl h-9 w-full"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 -ml-2 w-[calc(100vw-32px)] sm:w-[500px] bg-white" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>未找到相关结果</CommandEmpty>
              <SearchSuggestions 
                suggestions={suggestions} 
                onSelect={(value) => {
                  setSearchValue(value)
                  handleSearch(value)
                }}
              />
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}