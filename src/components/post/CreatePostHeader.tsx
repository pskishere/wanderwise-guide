import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface CreatePostHeaderProps {
  isSubmitting: boolean
  isOverLimit: boolean
  hasContent: boolean
}

export const CreatePostHeader = ({ isSubmitting, isOverLimit, hasContent }: CreatePostHeaderProps) => {
  const navigate = useNavigate()
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="flex items-center justify-between px-4 h-14 max-w-2xl mx-auto">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold">创建新帖子</span>
        </div>
        <Button
          type="submit"
          form="post-form"
          size="sm"
          className="rounded-full bg-pink-500 hover:bg-pink-600 px-4 transition-all"
          disabled={isSubmitting || isOverLimit || !hasContent}
        >
          发布
        </Button>
      </div>
    </div>
  )
}