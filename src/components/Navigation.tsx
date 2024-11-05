import { Heart, Search, MapPin, Utensils, BookOpen, Bell } from "lucide-react"
import { Link } from "react-router-dom"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

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

export function Navigation() {
  const navigate = useNavigate()
  const [margin, setMargin] = useState(8)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      if (documentHeight <= windowHeight || scrollPosition === 0) {
        setMargin(5)
      } else {
        setMargin(10)
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

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
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between">
          <div 
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{ margin: `${margin}px` }}
          >
            <div className="flex items-center justify-between bg-white/95 backdrop-blur-md px-3 py-2.5 rounded-2xl shadow-lg border border-gray-100/50 max-w-screen-lg mx-auto">
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
                        <CommandGroup heading="热门目的地" className="px-2">
                          {suggestions.destinations.map((item) => (
                            <CommandItem 
                              key={item.id}
                              onSelect={() => {
                                setSearchValue(item.name)
                                handleSearch(item.name)
                              }}
                              className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50">
                                  <MapPin className="h-4 w-4 text-pink-500" />
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandGroup heading="美食推荐" className="px-2">
                          {suggestions.foods.map((item) => (
                            <CommandItem
                              key={item.id}
                              onSelect={() => {
                                setSearchValue(item.name)
                                handleSearch(item.name)
                              }}
                              className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                                  <Utensils className="h-4 w-4 text-orange-500" />
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandGroup heading="热门攻略" className="px-2">
                          {suggestions.guides.map((item) => (
                            <CommandItem
                              key={item.id}
                              onSelect={() => {
                                setSearchValue(item.name)
                                handleSearch(item.name)
                              }}
                              className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                                  <BookOpen className="h-4 w-4 text-blue-500" />
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center gap-4 ml-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <MapPin className="h-4 w-4 text-gray-500" />
                </Button>
                <Link 
                  to="/notifications"
                  className="text-gray-600 hover:text-gray-900 transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                </Link>
                <Link 
                  to="/favorites"
                  className="text-gray-600 hover:text-gray-900 transition-colors relative"
                >
                  <Heart className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
