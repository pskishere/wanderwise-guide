import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { UserSearch } from "./users/UserSearch"
import { UserTable } from "./users/UserTable"
import type { User } from "./users/types"

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">用户管理</h2>
      </div>

      <UserSearch
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
        onSearch={handleSearch}
      />

      <UserTable
        users={filteredUsers}
        editingUser={editingUser}
        onEditUser={setEditingUser}
        onSaveEdit={handleSaveEdit}
        onDisable={handleDisable}
      />
    </div>
  )
}