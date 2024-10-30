import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Input } from "@/components/ui/input"
import { Search as SearchIcon, MapPin, Utensils, BookOpen } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Search = () => {
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      // Navigate to search results
      navigate(`/search/results?q=${encodeURIComponent(searchValue)}`)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-24 max-w-2xl">
        <form onSubmit={handleSearch} className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="搜索目的地、美食、攻略..."
            className="pl-10 py-6 text-base"
            autoFocus
          />
        </form>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">热门目的地</h3>
            <div className="space-y-2">
              {suggestions.destinations.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSearchValue(item.name)}
                  className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50">
                    <MapPin className="h-4 w-4 text-pink-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">美食推荐</h3>
            <div className="space-y-2">
              {suggestions.foods.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSearchValue(item.name)}
                  className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                    <Utensils className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">热门攻略</h3>
            <div className="space-y-2">
              {suggestions.guides.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSearchValue(item.name)}
                  className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Search