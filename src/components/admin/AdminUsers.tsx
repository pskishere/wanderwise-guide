import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: number
  name: string
  email: string
  avatar: string
  status: string
  role: string
  registerDate: string
  lastLogin: string
}

export const AdminUsers = () => {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "张三",
      email: "zhangsan@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80",
      status: "活跃",
      role: "用户",
      registerDate: "2024-01-15",
      lastLogin: "2024-03-20 15:30"
    },
    {
      id: 2,
      name: "李四",
      email: "lisi@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80",
      status: "禁用",
      role: "商家",
      registerDate: "2024-02-01",
      lastLogin: "2024-03-19 09:45"
    }
  ])
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const handleDisable = (id: number) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: user.status === "禁用" ? "活跃" : "禁用" } : user
    ))
    toast({
      description: "用户状态已更新",
    })
  }

  const handleSaveEdit = () => {
    if (!editingUser) return

    if (!editingUser.name || !editingUser.email) {
      toast({
        variant: "destructive",
        description: "请填写用户名和邮箱",
      })
      return
    }

    setUsers(prev => prev.map(user => 
      user.id === editingUser.id ? editingUser : user
    ))
    setEditingUser(null)
    toast({
      description: "用户信息已更新",
    })
  }

  const handleSearch = () => {
    // 实际项目中这里会调用API进行搜索
    toast({
      description: "搜索功能已触发",
    })
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "活跃":
        return "bg-green-100 text-green-800"
      case "禁用":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "商家":
        return "bg-blue-100 text-blue-800"
      case "管理员":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索用户名或邮箱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>用户</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>注册时间</TableHead>
              <TableHead>最后登录</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{user.registerDate}</TableCell>
                <TableCell className="text-sm text-gray-500">{user.lastLogin}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2">
                        编辑
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>编辑用户信息</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>用户名</Label>
                          <Input
                            value={editingUser?.name || user.name}
                            onChange={(e) => setEditingUser({
                              ...user,
                              name: e.target.value
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>邮箱</Label>
                          <Input
                            value={editingUser?.email || user.email}
                            onChange={(e) => setEditingUser({
                              ...user,
                              email: e.target.value
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>角色</Label>
                          <Select 
                            value={editingUser?.role || user.role}
                            onValueChange={(value) => setEditingUser({
                              ...user,
                              role: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="用户">用户</SelectItem>
                              <SelectItem value="商家">商家</SelectItem>
                              <SelectItem value="管理员">管理员</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleSaveEdit} className="w-full">保存</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant={user.status === "禁用" ? "outline" : "destructive"}
                    size="sm"
                    onClick={() => handleDisable(user.id)}
                  >
                    {user.status === "禁用" ? "启用" : "禁用"}
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