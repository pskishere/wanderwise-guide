import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface CreatePostHeaderProps {
  isSubmitting: boolean
  hasContent: boolean
  hasImages: boolean
}

export const CreatePostHeader = ({ isSubmitting, hasContent, hasImages }: CreatePostHeaderProps) => {
  const navigate = useNavigate()
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="flex items-center justify-between px-4 h-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="font-medium"
        >
          取消
        </Button>
        <span className="font-medium">发布笔记</span>
        <Button
          type="submit"
          form="post-form"
          variant="ghost"
          size="sm"
          className="text-pink-500 hover:text-pink-600 hover:bg-transparent"
          disabled={isSubmitting || !hasContent || !hasImages}
        >
          发布
        </Button>
      </div>
    </div>
  )
}