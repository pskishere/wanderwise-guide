import { Bell, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

export const Navigation = () => {
  return (
    <nav className="bg-white/50 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Unified Floating Box */}
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-8 py-3 rounded-2xl shadow-lg border border-gray-100/50 flex items-center gap-12 hover:shadow-xl transition-all duration-300 hover:bg-white/95">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              游记攻略
            </Link>
            
            <div className="flex items-center gap-8">
              <Link 
                to="/notifications" 
                className="text-gray-600 hover:text-gray-900 transition-all relative hover:scale-110"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full ring-2 ring-white animate-pulse"></span>
              </Link>
              <Link 
                to="/messages"
                className="text-gray-600 hover:text-gray-900 transition-all relative hover:scale-110"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-[10px] text-white animate-pulse">2</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}