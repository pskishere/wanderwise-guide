import { StatsCards } from "./dashboard/StatsCards"
import { SalesChart } from "./dashboard/SalesChart"

interface AdminDashboardProps {
  orders: any[]
  products: any[]
}

export const AdminDashboard = ({ orders, products }: AdminDashboardProps) => {
  return (
    <div className="space-y-4">
      <StatsCards orders={orders} products={products} />
      <SalesChart />
    </div>
  )
}