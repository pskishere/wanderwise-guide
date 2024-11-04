import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductSearchProps {
  searchTerm: string
  categoryFilter: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onSearch: () => void
}

export const ProductSearch = ({ 
  searchTerm, 
  categoryFilter,
  onSearchChange, 
  onCategoryChange,
  onSearch 
}: ProductSearchProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="搜索商品名称、编号或标签..."
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="商品分类" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            <SelectItem value="clothing">服装</SelectItem>
            <SelectItem value="accessories">配饰</SelectItem>
            <SelectItem value="shoes">鞋靴</SelectItem>
            <SelectItem value="bags">箱包</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onSearch} className="px-8">搜索</Button>
    </div>
  )
}