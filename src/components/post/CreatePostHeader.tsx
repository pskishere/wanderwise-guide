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
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="flex items-center justify-between px-4 h-12 max-w-2xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 font-medium">发布笔记</span>
        <Button
          type="submit"
          form="post-form"
          variant="ghost"
          size="sm"
          className="text-pink-500 hover:text-pink-600 hover:bg-transparent px-0"
          disabled={isSubmitting || isOverLimit || !hasContent}
        >
          发布
        </Button>
      </div>
    </div>
  )
}