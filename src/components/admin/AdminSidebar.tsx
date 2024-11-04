import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, ShoppingBag, List } from "lucide-react"

export const AdminSidebar = () => {
  const location = useLocation()
  const pathname = location.pathname

  const menuItems = [
    {
      title: "数据概览",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin"
    },
    {
      title: "订单管理",
      icon: List,
      href: "/admin/orders",
      active: pathname === "/admin/orders"
    },
    {
      title: "商品管理",
      icon: ShoppingBag,
      href: "/admin/products",
      active: pathname === "/admin/products"
    },
    {
      title: "用户管理",
      icon: Users,
      href: "/admin/users",
      active: pathname === "/admin/users"
    }
  ]

  return (
    <div className="w-64 min-h-screen bg-white border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold">后台管理系统</h2>
      </div>
      <nav className="space-y-1 px-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              item.active 
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}