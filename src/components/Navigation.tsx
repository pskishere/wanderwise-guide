import { Bell, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

export const Navigation = () => {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <Link to="/" className="text-2xl font-bold text-pink-500">
            游记攻略
          </Link>
          <div className="flex items-center gap-6">
            <Link 
              to="/notifications" 
              className="text-gray-600 hover:text-gray-900 transition-colors p-1"
            >
              <Bell className="h-5 w-5" />
            </Link>
            <Link 
              to="/messages"
              className="text-gray-600 hover:text-gray-900 transition-colors p-1"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}