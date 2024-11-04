import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "./types"

interface UserEditDialogProps {
  user: User
  editingUser: User | null
  onEditUser: (user: User) => void
  onSave: () => void
}

export const UserEditDialog = ({ user, editingUser, onEditUser, onSave }: UserEditDialogProps) => {
  return (
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
              onChange={(e) => onEditUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>邮箱</Label>
            <Input
              value={editingUser?.email || user.email}
              onChange={(e) => onEditUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>角色</Label>
            <Select 
              value={editingUser?.role || user.role}
              onValueChange={(value) => onEditUser({ ...user, role: value })}
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
          <Button onClick={onSave} className="w-full">保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}