import { Home, Compass, Heart, User, Plus } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

export const BottomNav = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg border-t border-gray-100/50 py-2 z-50">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto relative px-6">
        <div className="flex items-center gap-12">
          <Link 
            to="/" 
            className={`flex flex-col items-center gap-1 min-w-[48px] py-1 transition-colors relative ${
              isActive('/') ? 'text-[#F1424C]' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {isActive('/') && (
              <motion.div
                layoutId="bubble"
                className="absolute -top-3 w-1 h-1 rounded-full bg-[#F1424C]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Home className={`h-5 w-5 ${isActive('/') ? 'stroke-[2.5px]' : ''}`} />
            <span className="text-[10px] font-medium tracking-tight">首页</span>
          </Link>
          <Link 
            to="/explore" 
            className={`flex flex-col items-center gap-1 min-w-[48px] py-1 transition-colors relative ${
              isActive('/explore') ? 'text-[#F1424C]' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {isActive('/explore') && (
              <motion.div
                layoutId="bubble"
                className="absolute -top-3 w-1 h-1 rounded-full bg-[#F1424C]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Compass className={`h-5 w-5 ${isActive('/explore') ? 'stroke-[2.5px]' : ''}`} />
            <span className="text-[10px] font-medium tracking-tight">发现</span>
          </Link>
        </div>

        <Link
          to="/create-post"
          className={`absolute left-1/2 -translate-x-1/2 -top-5 flex items-center justify-center w-14 h-14 ${
            isActive('/create-post') ? 'bg-[#E13E47]' : 'bg-[#F1424C]'
          } rounded-full shadow-lg hover:bg-[#E13E47] transition-colors group`}
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Plus className="h-7 w-7 text-white group-hover:rotate-90 transition-transform duration-200" />
          </motion.div>
        </Link>

        <div className="flex items-center gap-12">
          <Link 
            to="/favorites" 
            className={`flex flex-col items-center gap-1 min-w-[48px] py-1 transition-colors relative ${
              isActive('/favorites') ? 'text-[#F1424C]' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {isActive('/favorites') && (
              <motion.div
                layoutId="bubble"
                className="absolute -top-3 w-1 h-1 rounded-full bg-[#F1424C]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Heart className={`h-5 w-5 ${isActive('/favorites') ? 'stroke-[2.5px]' : ''}`} />
            <span className="text-[10px] font-medium tracking-tight">收藏</span>
          </Link>
          <Link 
            to="/profile" 
            className={`flex flex-col items-center gap-1 min-w-[48px] py-1 transition-colors relative ${
              isActive('/profile') ? 'text-[#F1424C]' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {isActive('/profile') && (
              <motion.div
                layoutId="bubble"
                className="absolute -top-3 w-1 h-1 rounded-full bg-[#F1424C]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <User className={`h-5 w-5 ${isActive('/profile') ? 'stroke-[2.5px]' : ''}`} />
            <span className="text-[10px] font-medium tracking-tight">我的</span>
          </Link>
        </div>
      </div>
    </div>
  )
}