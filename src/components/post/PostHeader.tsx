import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const PostHeader = () => {
  const navigate = useNavigate()
  
  return (
    <button 
      onClick={() => navigate(-1)}
      className="fixed top-0 left-0 z-50 p-4 text-gray-700 hover:text-gray-900 transition-colors"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  )
}