import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PostSearchProps {
  searchTerm: string
  typeFilter: string
  onSearchChange: (value: string) => void
  onTypeChange: (value: string) => void
  onSearch: () => void
}

export const PostSearch = ({ 
  searchTerm, 
  typeFilter,
  onSearchChange, 
  onTypeChange,
  onSearch 
}: PostSearchProps) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-1 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索帖子标题、作者或标签..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </div>
        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="帖子类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            <SelectItem value="travel">游记</SelectItem>
            <SelectItem value="food">美食</SelectItem>
            <SelectItem value="shopping">购物</SelectItem>
            <SelectItem value="guide">攻略</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onSearch}>搜索</Button>
    </div>
  )
}