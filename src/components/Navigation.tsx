import { Bell, ShoppingCart, Search, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export const Navigation = () => {
  const [margin, setMargin] = useState(8)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const suggestions = {
    destinations: [
      { id: 1, name: "东京", type: "city" },
      { id: 2, name: "巴厘岛", type: "city" },
      { id: 3, name: "巴黎", type: "city" }
    ],
    foods: [
      { id: 1, name: "寿司", type: "food" },
      { id: 2, name: "披萨", type: "food" },
      { id: 3, name: "牛排", type: "food" }
    ],
    guides: [
      { id: 1, name: "东京购物攻略", type: "guide" },
      { id: 2, name: "巴厘岛潜水指南", type: "guide" },
      { id: 3, name: "巴黎美食地图", type: "guide" }
    ]
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      if (documentHeight <= windowHeight || scrollPosition === 0) {
        setMargin(8)
      } else {
        setMargin(4)
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

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div 
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{ margin: `${margin}px` }}
          >
            <div className="flex items-center justify-between bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-gray-100/50 max-w-screen-lg mx-auto">
              <div className="flex-1 max-w-2xl">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="搜索目的地、美食、攻略..." 
                        className="pl-8 bg-gray-100 border-0 rounded-full h-9"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[500px]" align="start">
                    <Command>
                      <CommandList>
                        <CommandEmpty>未找到相关结果</CommandEmpty>
                        <CommandGroup heading="热门目的地">
                          {suggestions.destinations.map((item) => (
                            <CommandItem 
                              key={item.id}
                              onSelect={() => {
                                setSearchValue(item.name)
                                setOpen(false)
                              }}
                            >
                              <MapPin className="mr-2 h-4 w-4" />
                              {item.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandGroup heading="美食推荐">
                          {suggestions.foods.map((item) => (
                            <CommandItem
                              key={item.id}
                              onSelect={() => {
                                setSearchValue(item.name)
                                setOpen(false)
                              }}
                            >
                              {item.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandGroup heading="热门攻略">
                          {suggestions.guides.map((item) => (
                            <CommandItem
                              key={item.id}
                              onSelect={() => {
                                setSearchValue(item.name)
                                setOpen(false)
                              }}
                            >
                              {item.name}
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
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-pink-500 rounded-full ring-2 ring-white animate-pulse"></span>
                </Link>
                <Link 
                  to="/cart"
                  className="text-gray-600 hover:text-gray-900 transition-colors relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white animate-bounce">2</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}