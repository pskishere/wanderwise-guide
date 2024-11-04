import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { AdminOrders } from "@/components/admin/AdminOrders"
import { AdminProducts } from "@/components/admin/AdminProducts"
import { AdminUsers } from "@/components/admin/AdminUsers"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Admin = () => {
  const navigate = useNavigate()
  const { orders } = useSelector((state: RootState) => state.order)
  const { products } = useSelector((state: RootState) => state.product)
  const { user } = useSelector((state: RootState) => state.user)

  // 检查用户权限
  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="text-xl font-bold">后台管理系统</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">管理员：{user?.name}</span>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-white p-1">
            <TabsTrigger value="dashboard">数据概览</TabsTrigger>
            <TabsTrigger value="orders">订单管理</TabsTrigger>
            <TabsTrigger value="products">商品管理</TabsTrigger>
            <TabsTrigger value="users">用户管理</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
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