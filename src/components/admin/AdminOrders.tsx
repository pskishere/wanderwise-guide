import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { OrderStatusBadge } from "./orders/OrderStatusBadge"
import { OrderSearchBar } from "./orders/OrderSearchBar"
import { OrderActions } from "./orders/OrderActions"

interface AdminOrdersProps {
  orders: any[]
}

export const AdminOrders = ({ orders: initialOrders }: AdminOrdersProps) => {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!searchTerm.trim() && statusFilter === "all") {
      setOrders(initialOrders)
      return
    }

    const filtered = initialOrders.filter(order => {
      const matchesSearch = !searchTerm.trim() || 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address?.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })
    setOrders(filtered)
  }

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    toast({
      description: "订单状态已更新",
    })
  }

  const handleViewDetails = (orderId: string) => {
    navigate(`/admin/orders/${orderId}`)
  }

  return (
    <div className="space-y-4">
      <OrderSearchBar
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
        onSearch={handleSearch}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单号</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>收货人</TableHead>
              <TableHead>收货地址</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>¥{order.totalAmount}</TableCell>
                <TableCell>{order.address?.name}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {order.address?.fullAddress}
                </TableCell>
                <TableCell>
                  <OrderActions
                    orderId={order.id}
                    currentStatus={order.status}
                    onUpdateStatus={handleUpdateStatus}
                    onViewDetails={handleViewDetails}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}