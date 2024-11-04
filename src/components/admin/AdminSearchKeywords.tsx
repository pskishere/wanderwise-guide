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
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export const AdminSearchKeywords = () => {
  const [keywords, setKeywords] = useState([
    { id: 1, keyword: "东京", searchCount: 1234 },
    { id: 2, keyword: "京都", searchCount: 890 },
    { id: 3, keyword: "大阪", searchCount: 756 }
  ])
  const [newKeyword, setNewKeyword] = useState("")
  const { toast } = useToast()

  const handleAdd = () => {
    if (!newKeyword.trim()) return
    
    setKeywords(prev => [
      ...prev, 
      { 
        id: Date.now(),
        keyword: newKeyword,
        searchCount: 0
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

  return (
    <div className="space-y-4">
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>关键词</TableHead>
              <TableHead>搜索次数</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keywords.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.keyword}</TableCell>
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