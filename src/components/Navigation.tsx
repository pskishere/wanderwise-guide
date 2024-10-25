import { Bell, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Floating Title */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-lg 
              bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent
              hover:scale-105 transition-transform duration-200"
          >
            游记攻略
          </Link>

          {/* Floating Action Buttons */}
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
            <Link 
              to="/notifications" 
              className="text-gray-600 hover:text-gray-900 transition-colors relative
                hover:scale-110 transition-transform duration-200"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-pink-500 rounded-full ring-2 ring-white"></span>
            </Link>
            <Link 
              to="/messages"
              className="text-gray-600 hover:text-gray-900 transition-colors relative
                hover:scale-110 transition-transform duration-200"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white">2</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}