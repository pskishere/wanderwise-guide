import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserSearchProps {
  searchTerm: string
  statusFilter: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSearch: () => void
}

export const UserSearch = ({ 
  searchTerm, 
  statusFilter, 
  onSearchChange, 
  onStatusChange,
  onSearch 
}: UserSearchProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索用户名或邮箱..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </div>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="状态筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="活跃">活跃</SelectItem>
            <SelectItem value="禁用">禁用</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}