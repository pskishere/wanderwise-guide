import { Home, Compass, Heart, User } from "lucide-react"
import { Link } from "react-router-dom"

export const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center gap-1">
          <Home className="h-6 w-6" />
          <span className="text-xs">首页</span>
        </Link>
        <Link to="/explore" className="flex flex-col items-center gap-1">
          <Compass className="h-6 w-6" />
          <span className="text-xs">发现</span>
        </Link>
        <Link to="/favorites" className="flex flex-col items-center gap-1">
          <Heart className="h-6 w-6" />
          <span className="text-xs">收藏</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1">
          <User className="h-6 w-6" />
          <span className="text-xs">我的</span>
        </Link>
      </div>
    </div>
  )
}