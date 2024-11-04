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

export const AdminUsers = () => {
  const { toast } = useToast()
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "张三",
      email: "zhangsan@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80",
      status: "活跃"
    },
    {
      id: 2,
      name: "李四",
      email: "lisi@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80",
      status: "离线"
    }
  ])
  const [editingUser, setEditingUser] = useState<any>(null)

  const handleDisable = (id: number) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: "禁用" } : user
    ))
    toast({
      description: "用户已禁用",
    })
  }

  const handleSaveEdit = () => {
    if (!editingUser) return

    setUsers(prev => prev.map(user => 
      user.id === editingUser.id ? editingUser : user
    ))
    setEditingUser(null)
    toast({
      description: "用户信息已更新",
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>用户</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
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
                      <Button onClick={handleSaveEdit}>保存</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDisable(user.id)}
                  disabled={user.status === "禁用"}
                >
                  禁用
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}