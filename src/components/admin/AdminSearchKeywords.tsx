import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const AdminSearchKeywords = () => {
  const [keywords, setKeywords] = useState([
    { id: 1, keyword: "东京", searchCount: 1234, type: "destination" },
    { id: 2, keyword: "京都", searchCount: 890, type: "destination" },
    { id: 3, keyword: "大阪", searchCount: 756, type: "destination" }
  ])
  const [newKeyword, setNewKeyword] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const { toast } = useToast()

  const handleAdd = () => {
    if (!newKeyword.trim()) return
    
    setKeywords(prev => [
      ...prev, 
      { 
        id: Date.now(),
        keyword: newKeyword,
        searchCount: 0,
        type: "destination"
      }
    ])
    setNewKeyword("")
    
    toast({
      description: "关键词已添加",
    })
  }

  const handleDelete = (id: number) => {
    setKeywords(prev => prev.filter(k => k.id !== id))
    toast({
      description: "关键词已删除",
    })
  }

  const handleSearch = () => {
    // 实现搜索逻辑
  }

  const filteredKeywords = keywords.filter(keyword => {
    const matchesSearch = searchTerm === "" || 
      keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || keyword.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">热门搜索词管理</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索关键词..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="关键词类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            <SelectItem value="destination">目的地</SelectItem>
            <SelectItem value="food">美食</SelectItem>
            <SelectItem value="activity">活动</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="输入关键词"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-1" />
          添加
        </Button>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>关键词</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>搜索次数</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredKeywords.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.keyword}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.searchCount}</TableCell>
                <TableCell>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}