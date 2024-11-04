import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const PostHeader = () => {
  const navigate = useNavigate()
  
  return (
    <button 
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 z-50 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  )
}