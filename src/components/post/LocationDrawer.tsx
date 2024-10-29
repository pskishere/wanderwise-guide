import { Drawer } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { MapPin, Search } from "lucide-react"
import { useState } from "react"

interface LocationDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (location: string) => void
}

const mockLocations = [
  "东京塔",
  "浅草寺",
  "新宿御苑",
  "明治神宫",
  "涉谷十字路口",
  "银座",
  "秋叶原",
  "上野公园"
]

export const LocationDrawer = ({ open, onOpenChange, onSelect }: LocationDrawerProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredLocations = mockLocations.filter(location => 
    location.toLowerCase().includes(searchTerm.toLowerCase())
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

        <div className="space-y-2">
          {filteredLocations.map((location) => (
            <button
              key={location}
              className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => {
                onSelect(location)
                onOpenChange(false)
              }}
            >
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{location}</span>
            </button>
          ))}
        </div>
      </div>
    </Drawer>
  )
}