import { Bell, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

export const Navigation = () => {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between h-10">
          <Link to="/" className="text-xl font-bold text-pink-500">
            游记攻略
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/notifications" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Bell className="h-4 w-4" />
            </Link>
            <Link 
              to="/messages"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}