import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ProductSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onSearch: () => void
}

export const ProductSearch = ({ searchTerm, onSearchChange, onSearch }: ProductSearchProps) => {
  return (
    <div className="relative">
      <Input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="搜索商品名称"
        className="pl-10"
      />
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
        onClick={onSearch}
      />
    </div>
  )
}