import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, X, Send, Globe2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { Avatar } from "@/components/ui/avatar"

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

  const characterCount = content.length
  const maxCharacters = 280
  const remainingCharacters = maxCharacters - characterCount
  const isOverLimit = remainingCharacters < 0

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <form onSubmit={handleSubmit} className="container max-w-2xl mx-auto px-4 pt-20 pb-32">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <img src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>

          <div className="flex-1 space-y-6">
            <Input
              placeholder="标题 (可选)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold border-0 px-0 placeholder:text-gray-400 focus-visible:ring-0"
            />

            <Textarea
              placeholder="分享你的故事..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] text-lg resize-none border-0 focus-visible:ring-0 placeholder:text-gray-400"
            />

            {/* Image Preview */}
            {images.length > 0 && (
              <div className={`grid gap-2 ${
                images.length === 1 ? 'grid-cols-1' : 
                images.length === 2 ? 'grid-cols-2' :
                images.length === 3 ? 'grid-cols-2' :
                'grid-cols-2'
              }`}>
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`relative group ${
                      images.length === 3 && index === 0 ? 'row-span-2' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`上传图片 ${index + 1}`}
                      className="w-full h-full object-cover rounded-2xl aspect-square"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                {images.length < 4 && (
                  <label className="p-2 hover:bg-blue-50 rounded-full cursor-pointer transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Camera className="w-5 h-5 text-blue-500" />
                  </label>
                )}
                <button type="button" className="p-2 hover:bg-blue-50 rounded-full transition-colors">
                  <Globe2 className="w-5 h-5 text-blue-500" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                {characterCount > 0 && (
                  <div className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                    {remainingCharacters}
                  </div>
                )}
                <Button
                  type="submit"
                  className="rounded-full bg-blue-500 hover:bg-blue-600"
                  disabled={isSubmitting || isOverLimit}
                >
                  发布
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <BottomNav />
    </div>
  )
}

export default CreatePost