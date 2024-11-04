import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  List,
  FileText,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const AdminSidebar = () => {
  const location = useLocation()
  const pathname = location.pathname
  const [isCollapsed, setIsCollapsed] = useState(false)

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
    },
    {
      title: "帖子管理",
      icon: FileText,
      href: "/admin/posts",
      active: pathname === "/admin/posts"
    },
    {
      title: "热门搜索词",
      icon: Search,
      href: "/admin/search-keywords",
      active: pathname === "/admin/search-keywords"
    }
  ]

  return (
    <div 
      className={cn(
        "min-h-screen bg-white border-r transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-64"
      )}
    >
      <div className={cn(
        "p-6 flex items-center justify-between",
        isCollapsed && "px-4"
      )}>
        {!isCollapsed && <h2 className="text-lg font-semibold">后台管理系统</h2>}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="space-y-1 px-3">
        <TooltipProvider delayDuration={0}>
          {menuItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    item.active 
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && item.title}
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  {item.title}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </div>
  )
}