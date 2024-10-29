import { Home, Compass, Heart, User, Plus } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export const BottomNav = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 py-1.5 px-4 z-50">
      <div className="flex justify-around items-center max-w-screen-lg mx-auto relative">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-0.5 min-w-[64px] py-1 transition-colors ${
            isActive('/') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium">首页</span>
        </Link>
        <Link 
          to="/explore" 
          className={`flex flex-col items-center gap-0.5 min-w-[64px] py-1 transition-colors ${
            isActive('/explore') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Compass className="h-5 w-5" />
          <span className="text-[10px] font-medium">发现</span>
        </Link>

        {/* 发帖按钮 */}
        <Link
          to="/create-post"
          className="absolute left-1/2 -translate-x-1/2 -top-6 flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
        >
          <Plus className="h-6 w-6 text-white" />
        </Link>

        <Link 
          to="/favorites" 
          className={`flex flex-col items-center gap-0.5 min-w-[64px] py-1 transition-colors ${
            isActive('/favorites') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Heart className="h-5 w-5" />
          <span className="text-[10px] font-medium">收藏</span>
        </Link>
        <Link 
          to="/profile" 
          className={`flex flex-col items-center gap-0.5 min-w-[64px] py-1 transition-colors ${
            isActive('/profile') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-medium">我的</span>
        </Link>
      </div>
    </div>
  )
}