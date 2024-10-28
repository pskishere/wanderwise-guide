import { Bell, ShoppingCart, Search, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

export const Navigation = () => {
  const [margin, setMargin] = useState(8)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      if (documentHeight <= windowHeight || scrollPosition === 0) {
        setMargin(8)
      } else {
        setMargin(4)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div 
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{ margin: `${margin}px` }}
          >
            <div className="flex items-center justify-between bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-gray-100/50 max-w-screen-lg mx-auto">
              <Link to="/" className="hidden md:block font-semibold text-lg">
                小红书
              </Link>

              <div className="flex-1 max-w-2xl mx-auto md:mx-8">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="搜索目的地、美食、攻略..." 
                    className="pl-8 bg-gray-100 border-0 rounded-full h-9"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
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
                  to="/cart"
                  className="text-gray-600 hover:text-gray-900 transition-colors relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white animate-bounce">2</span>
                </Link>
                <div className="hidden md:block h-6 w-px bg-gray-200 mx-2"></div>
                <Link 
                  to="/profile"
                  className="hidden md:block"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80" 
                    alt="用户头像" 
                    className="w-8 h-8 rounded-full ring-2 ring-white"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}