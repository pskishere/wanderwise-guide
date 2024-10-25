import { Button } from "@/components/ui/button"
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
    <div className="min-h-screen bg-gray-50 pb-14">
      <Navigation />
      
      {/* Categories */}
      <div className="container mx-auto px-2 pt-20 pb-1">
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