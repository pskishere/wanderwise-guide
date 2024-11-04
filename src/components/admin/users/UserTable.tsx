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
import { Badge } from "@/components/ui/badge"
import { User } from "./types"
import { UserEditDialog } from "./UserEditDialog"

interface UserTableProps {
  users: User[]
  editingUser: User | null
  onEditUser: (user: User) => void
  onSaveEdit: () => void
  onDisable: (id: number) => void
}

export const UserTable = ({ 
  users, 
  editingUser, 
  onEditUser, 
  onSaveEdit, 
  onDisable 
}: UserTableProps) => {
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
    <div className="rounded-md border bg-white shadow-sm">
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
          {users.map((user) => (
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
                <UserEditDialog
                  user={user}
                  editingUser={editingUser}
                  onEditUser={onEditUser}
                  onSave={onSaveEdit}
                />
                <Button 
                  variant={user.status === "禁用" ? "outline" : "destructive"}
                  size="sm"
                  onClick={() => onDisable(user.id)}
                >
                  {user.status === "禁用" ? "启用" : "禁用"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}