import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const FavoritesHeader = () => {
  const navigate = useNavigate()
  
  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="h-14 flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-medium">我的收藏</h1>
        </div>
      </div>
    </div>
  )
}