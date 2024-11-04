import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useNavigate, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { AdminOrders } from "@/components/admin/AdminOrders"
import { AdminProducts } from "@/components/admin/AdminProducts"
import { AdminUsers } from "@/components/admin/AdminUsers"
import { AdminPosts } from "@/components/admin/AdminPosts"
import { AdminSearchKeywords } from "@/components/admin/AdminSearchKeywords"

const Admin = () => {
  const navigate = useNavigate()
  const { orders } = useSelector((state: RootState) => state.order)
  const { products } = useSelector((state: RootState) => state.product)
  const { posts } = useSelector((state: RootState) => state.post)
  const { user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <Routes>
          <Route index element={<AdminDashboard orders={orders} products={products} />} />
          <Route path="orders" element={<AdminOrders orders={orders} />} />
          <Route path="products" element={<AdminProducts products={products} />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="posts" element={<AdminPosts posts={posts} />} />
          <Route path="search-keywords" element={<AdminSearchKeywords />} />
        </Routes>
      </main>
    </div>
  )
}

export default Admin