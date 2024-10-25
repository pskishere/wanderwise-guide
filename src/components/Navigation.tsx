import { Bell, MessageCircle, Search, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export const Navigation = () => {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Full Width Floating Box */}
          <div className="fixed top-2 left-0 right-0 mx-4 z-50">
            <div className="flex items-center justify-between bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-gray-100/50 max-w-screen-lg mx-auto">
              <Link 
                to="/" 
                className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 bg-clip-text text-transparent"
              >
                游记攻略
              </Link>
              
              <div className="flex-1 max-w-md mx-6">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="搜索目的地、美食、攻略..." 
                    className="pl-8 bg-gray-100 border-0 rounded-full h-9"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <MapPin className="h-4 w-4 text-gray-500" />
                </Button>
                <Link 
                  to="/notifications" 
                  className="text-gray-600 hover:text-gray-900 transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-pink-500 rounded-full ring-2 ring-white animate-pulse"></span>
                </Link>
                <Link 
                  to="/messages"
                  className="text-gray-600 hover:text-gray-900 transition-colors relative"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white animate-bounce">2</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}