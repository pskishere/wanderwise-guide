import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { AdminOrders } from "@/components/admin/AdminOrders"
import { AdminProducts } from "@/components/admin/AdminProducts"
import { AdminUsers } from "@/components/admin/AdminUsers"
import { AdminDashboard } from "@/components/admin/AdminDashboard"

const Admin = () => {
  const orders = useSelector((state: RootState) => state.order.orders)
  const products = useSelector((state: RootState) => state.product.products)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">后台管理系统</h1>
        
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">数据概览</TabsTrigger>
            <TabsTrigger value="orders">订单管理</TabsTrigger>
            <TabsTrigger value="products">商品管理</TabsTrigger>
            <TabsTrigger value="users">用户管理</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard orders={orders} products={products} />
          </TabsContent>

          <TabsContent value="orders">
            <AdminOrders orders={orders} />
          </TabsContent>

          <TabsContent value="products">
            <AdminProducts products={products} />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin