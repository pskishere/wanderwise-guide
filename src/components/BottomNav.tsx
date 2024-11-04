import { Home, Compass, ShoppingCart, User, Plus } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export const BottomNav = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 py-2 z-50">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto px-4">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-0.5 min-w-[64px] py-1 transition-colors ${
            isActive('/') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Home className={`h-5 w-5 ${isActive('/') ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-xs font-medium tracking-tight">首页</span>
        </Link>

        <Link 
          to="/explore" 
          className={`flex flex-col items-center gap-0.5 min-w-[64px] py-1 transition-colors ${
            isActive('/explore') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Compass className={`h-5 w-5 ${isActive('/explore') ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-xs font-medium tracking-tight">发现</span>
        </Link>

        <Link
          to="/create-post"
          className={`flex flex-col items-center gap-0.5 min-w-[64px] py-1 transition-colors ${
            isActive('/create-post') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Plus className={`h-5 w-5 ${isActive('/create-post') ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-xs font-medium tracking-tight">发布</span>
        </Link>

        <Link 
          to="/cart" 
          className={`flex flex-col items-center gap-0.5 min-w-[64px] py-1 transition-colors ${
            isActive('/cart') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <ShoppingCart className={`h-5 w-5 ${isActive('/cart') ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-xs font-medium tracking-tight">购物车</span>
        </Link>

        <Link 
          to="/profile" 
          className={`flex flex-col items-center gap-0.5 min-w-[64px] py-1 transition-colors ${
            isActive('/profile') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <User className={`h-5 w-5 ${isActive('/profile') ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-xs font-medium tracking-tight">我的</span>
        </Link>
      </div>
    </div>
  )
}