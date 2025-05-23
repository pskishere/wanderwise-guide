import { Heart, MapPin, Bell } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { SearchBar } from "./navigation/SearchBar"

interface NavigationProps {
  title?: string
  showBack?: boolean
}

export function Navigation({ title, showBack }: NavigationProps) {
  const [margin, setMargin] = useState(8)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      if (documentHeight <= windowHeight || scrollPosition === 0) {
        setMargin(5)
      } else {
        setMargin(10)
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
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between">
          <div 
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{ margin: `${margin}px` }}
          >
            <div className="flex items-center justify-between bg-white/95 backdrop-blur-md px-3 py-2.5 rounded-2xl shadow-lg border border-gray-100/50 max-w-screen-lg mx-auto">
              <SearchBar />
              <div className="flex items-center gap-4 ml-4">
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
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                </Link>
                <Link 
                  to="/favorites"
                  className="text-gray-600 hover:text-gray-900 transition-colors relative"
                >
                  <Heart className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}