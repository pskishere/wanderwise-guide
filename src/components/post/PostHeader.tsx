import { Button } from "@/components/ui/button"
import { ChevronLeft, Share } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface PostHeaderProps {
  title: string
  author: {
    name: string
    avatar: string
  }
}

export const PostHeader = ({ title }: PostHeaderProps) => {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      <div className="flex items-center justify-between h-12 px-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-base font-medium truncate">{title}</h1>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8"
        >
          <Share className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}