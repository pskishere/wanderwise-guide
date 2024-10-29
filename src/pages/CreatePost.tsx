import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, X, Send } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // Convert selected files to image URLs
    const newImages = Array.from(files).map(file => URL.createObjectURL(file))
    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        description: "请填写标题和内容",
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        description: "发布成功！",
      })
      navigate("/")
    } catch (error) {
      toast({
        variant: "destructive",
        description: "发布失败，请重试",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <form onSubmit={handleSubmit} className="container max-w-2xl mx-auto px-4 pt-20 pb-32">
        <div className="space-y-6 bg-white rounded-xl shadow-sm p-4 md:p-6">
          <Input
            placeholder="输入标题..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-medium border-0 border-b focus-visible:ring-0 rounded-none px-0 placeholder:text-gray-400"
          />

          <Textarea
            placeholder="分享你的故事..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] resize-none border-0 focus-visible:ring-0 placeholder:text-gray-400"
          />

          {/* Image Upload */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`上传图片 ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))}
              
              {images.length < 9 && (
                <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-pink-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Camera className="w-6 h-6 text-gray-400" />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-400">最多上传9张图片</p>
          </div>

          <Button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600"
            disabled={isSubmitting}
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "发布中..." : "发布"}
          </Button>
        </div>
      </form>

      <BottomNav />
    </div>
  )
}

export default CreatePost