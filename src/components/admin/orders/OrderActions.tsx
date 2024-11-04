import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

interface OrderActionsProps {
  orderId: string
  currentStatus: string
  onUpdateStatus: (orderId: string, newStatus: string) => void
  onViewDetails: (orderId: string) => void
}

export const OrderActions = ({ orderId, currentStatus, onUpdateStatus, onViewDetails }: OrderActionsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)

  const handleStatusUpdate = () => {
    onUpdateStatus(orderId, selectedStatus)
    setIsOpen(false)
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => onViewDetails(orderId)}>
        查看详情
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm">更新状态</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>更新订单状态</DialogTitle>
            <DialogDescription>
              选择新的订单状态
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="待付款">待付款</SelectItem>
                <SelectItem value="待发货">待发货</SelectItem>
                <SelectItem value="待收货">待收货</SelectItem>
                <SelectItem value="已完成">已完成</SelectItem>
                <SelectItem value="已取消">已取消</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleStatusUpdate}>确认更新</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}