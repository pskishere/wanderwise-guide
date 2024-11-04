import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface OrderSearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onSearch: () => void
}

export const OrderSearchBar = ({ searchTerm, onSearchChange, onSearch }: OrderSearchBarProps) => {
  return (
    <div className="flex gap-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="搜索订单号或收货人..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
      </div>
      <Button onClick={onSearch}>搜索</Button>
    </div>
  )
}