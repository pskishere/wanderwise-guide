import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CreatePostHeader } from "@/components/post/CreatePostHeader"
import { ImageUploader } from "@/components/post/ImageUploader"
import { BottomNav } from "@/components/BottomNav"
import { Tag } from "lucide-react"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const navigate = useNavigate()
  const { toast } = useToast()

  const suggestedTags = ["旅行", "美食", "穿搭", "护肤", "数码", "生活"]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files).map(file => URL.createObjectURL(file))
    if (images.length + newImages.length > 9) {
      toast({
        variant: "destructive",
        description: "最多只能上传9张图片",
      })
      return
    }
    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() && !content.trim()) {
      toast({
        variant: "destructive",
        description: "请输入内容后再发布",
      })
      return
    }

    if (images.length === 0) {
      toast({
        variant: "destructive",
        description: "请至少上传一张图片",
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
  const maxCharacters = 1000
  const remainingCharacters = maxCharacters - characterCount
  const isOverLimit = remainingCharacters < 0

  return (
    <div className="min-h-screen bg-white">
      <CreatePostHeader 
        isSubmitting={isSubmitting}
        isOverLimit={isOverLimit}
        hasContent={Boolean(title.trim() || content.trim())}
      />
      
      <form id="post-form" onSubmit={handleSubmit} className="container max-w-2xl mx-auto pt-16 pb-32">
        <div className="space-y-4 p-4">
          <ImageUploader 
            images={images}
            onUpload={handleImageUpload}
            onRemove={removeImage}
            characterCount={characterCount}
            remainingCharacters={remainingCharacters}
            isOverLimit={isOverLimit}
          />

          <Input
            placeholder="标题 (选填)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-medium border-0 px-0 focus-visible:ring-0 placeholder:text-gray-400"
          />

          <Textarea
            placeholder="这一刻的想法..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] text-base resize-none border-0 focus-visible:ring-0 placeholder:text-gray-400"
          />

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Tag className="w-4 h-4" />
              <span>添加标签</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-pink-50 text-pink-500'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>

      <BottomNav />
    </div>
  )
}

export default CreatePost