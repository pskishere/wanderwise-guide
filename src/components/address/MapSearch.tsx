
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface MapSearchProps {
  onAddressSelect: (address: {
    province: string
    city: string
    district: string
    detail: string
  }) => void
}

export const MapSearch = ({ onAddressSelect }: MapSearchProps) => {
  const [location, setLocation] = useState("")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!location.trim()) return
    
    // Simple parsing to demonstrate functionality
    // In a real app, you would use a proper address parsing library
    const parts = location.trim().split(/\s+/)
    
    onAddressSelect({
      province: parts[0] || "",
      city: parts[1] || "",
      district: parts[2] || "",
      detail: parts.slice(3).join(" ") || ""
    })
    
    setLocation("")
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Input
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="输入位置信息，如：北京市 海淀区 学院路"
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      <Button type="submit" size="sm">添加</Button>
    </form>
  )
}
