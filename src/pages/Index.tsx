import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/Navigation"
import { TravelNotes } from "@/components/TravelNotes"
import { BottomNav } from "@/components/BottomNav"
import { Stories } from "@/components/Stories"
import { PopularDestinations } from "@/components/PopularDestinations"
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="font-medium mb-3">分类浏览</h2>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "ghost"}
                    className={`justify-start h-9 ${
                      activeCategory === category.id 
                        ? "bg-pink-500 hover:bg-pink-600 text-white" 
                        : "hover:bg-pink-50 text-gray-600"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <PopularDestinations />
          </aside>

          {/* Main Content */}
          <main className="space-y-6">
            <Stories />
            
            {/* Mobile Categories */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
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

            <TravelNotes />
          </main>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Index