import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface AdminOrdersProps {
  orders: any[]
}

export const AdminOrders = ({ orders }: AdminOrdersProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>订单号</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>金额</TableHead>
            <TableHead>收货地址</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>¥{order.totalAmount}</TableCell>
              <TableCell>{order.address?.fullAddress}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  查看详情
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}