import { Home, Compass, Heart, User, Plus } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export const BottomNav = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 py-2 px-4 z-50">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto relative px-8">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 min-w-[64px] py-1 transition-colors ${
            isActive('/') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Home className={`h-[22px] w-[22px] ${isActive('/') ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[11px] font-medium tracking-tight">首页</span>
        </Link>
        <Link 
          to="/explore" 
          className={`flex flex-col items-center gap-1 min-w-[64px] py-1 transition-colors ${
            isActive('/explore') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Compass className={`h-[22px] w-[22px] ${isActive('/explore') ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[11px] font-medium tracking-tight">发现</span>
        </Link>

        {/* 发帖按钮 */}
        <Link
          to="/create-post"
          className={`absolute left-1/2 -translate-x-1/2 -top-6 flex items-center justify-center w-14 h-14 ${
            isActive('/create-post') ? 'bg-pink-600' : 'bg-pink-500'
          } rounded-full shadow-lg hover:bg-pink-600 transition-colors group`}
        >
          <Plus className="h-7 w-7 text-white group-hover:rotate-90 transition-transform duration-200" />
        </Link>

        <Link 
          to="/favorites" 
          className={`flex flex-col items-center gap-1 min-w-[64px] py-1 transition-colors ${
            isActive('/favorites') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Heart className={`h-[22px] w-[22px] ${isActive('/favorites') ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[11px] font-medium tracking-tight">收藏</span>
        </Link>
        <Link 
          to="/profile" 
          className={`flex flex-col items-center gap-1 min-w-[64px] py-1 transition-colors ${
            isActive('/profile') ? 'text-pink-500' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <User className={`h-[22px] w-[22px] ${isActive('/profile') ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[11px] font-medium tracking-tight">我的</span>
        </Link>
      </div>
    </div>
  )
}