import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { TravelNotes } from "@/components/TravelNotes"
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
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navigation />
      
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white py-2">
        <div className="container mx-auto px-2">
          <div className="flex w-full gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="搜索目的地、美食、攻略..." 
                className="pl-8 bg-gray-100 border-0 rounded-full h-9"
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <MapPin className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-2 py-2">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="rounded-full text-sm h-8 px-3"
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