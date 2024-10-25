import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { TravelNotes } from "@/components/TravelNotes"
import { Stories } from "@/components/Stories"
import { BottomNav } from "@/components/BottomNav"
import { useState } from "react"

const categories = [
  { id: "all", name: "全部" },
  { id: "domestic", name: "国内游" },
  { id: "overseas", name: "出境游" },
  { id: "food", name: "美食" },
  { id: "photography", name: "拍照打卡" },
  { id: "shopping", name: "购物" },
  { id: "culture", name: "文化古迹" },
]

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex w-full gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="搜索目的地、美食、攻略..." 
                className="pl-10 bg-gray-100"
              />
            </div>
            <Button variant="outline" size="icon">
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stories */}
      <div className="bg-white mb-2">
        <Stories />
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="rounded-full whitespace-nowrap"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <TravelNotes />
      <BottomNav />
    </div>
  )
}

export default Index