import { Home, Compass, Heart, User, Plus, Bell, ShoppingCart } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export const SideNav = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navItems = [
    { path: "/", icon: Home, label: "首页" },
    { path: "/explore", icon: Compass, label: "发现" },
    { path: "/favorites", icon: Heart, label: "收藏" },
    { path: "/notifications", icon: Bell, label: "通知" },
    { path: "/cart", icon: ShoppingCart, label: "购物车" },
    { path: "/profile", icon: User, label: "我的" },
  ]

  return (
    <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 p-4">
      <div className="flex flex-col gap-2 w-full pt-20">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-gray-500 hover:text-gray-900",
                isActive(item.path) && "bg-pink-50 text-pink-500 hover:text-pink-600"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}

        <Link to="/create-post">
          <Button className="w-full mt-4 gap-2">
            <Plus className="h-5 w-5" />
            发布
          </Button>
        </Link>
      </div>
    </div>
  )
}