import { Drawer } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { MapPin, Search } from "lucide-react"
import { useState } from "react"

interface LocationDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (location: string) => void
}

const popularLocations = [
  { name: "东京塔", category: "景点" },
  { name: "浅草寺", category: "景点" },
  { name: "新宿御苑", category: "公园" },
  { name: "明治神宫", category: "景点" },
  { name: "涉谷十字路口", category: "地标" },
  { name: "银座", category: "商圈" },
  { name: "秋叶原", category: "商圈" },
  { name: "上野公园", category: "公园" }
]

export const LocationDrawer = ({ open, onOpenChange, onSelect }: LocationDrawerProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredLocations = popularLocations.filter(location => 
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <div className="p-4 bg-white min-h-[60vh]">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            placeholder="搜索地点"
          />
        </div>

        <div className="space-y-1">
          {filteredLocations.map((location) => (
            <button
              key={location.name}
              className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => {
                onSelect(location.name)
                onOpenChange(false)
              }}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{location.name}</span>
              </div>
              <span className="text-xs text-gray-400">{location.category}</span>
            </button>
          ))}

          {filteredLocations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">未找到相关地点</p>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  )
}