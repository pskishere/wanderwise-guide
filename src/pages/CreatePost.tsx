import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BottomNav } from "@/components/BottomNav"
import { CreatePostHeader } from "@/components/post/CreatePostHeader"
import { ImageUploader } from "@/components/post/ImageUploader"
import { TagSelector } from "@/components/post/TagSelector"
import { LocationButton } from "@/components/post/LocationButton"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const navigate = useNavigate()
  const { toast } = useToast()

  const suggestedTags = ["旅行", "美食", "穿搭", "护肤", "数码", "生活", "购物"]

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

  return (
    <div className="min-h-screen bg-white">
      <CreatePostHeader 
        isSubmitting={isSubmitting}
        hasContent={Boolean(title.trim() || content.trim())}
        hasImages={images.length > 0}
      />

      <form id="post-form" onSubmit={handleSubmit} className="pt-12 pb-20">
        <div className="p-4">
          <ImageUploader 
            images={images}
            onUpload={handleImageUpload}
            onRemove={removeImage}
          />
        </div>

        <div className="px-4 space-y-4">
          <Input
            placeholder="填写标题会有更多赞哦～"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg border-0 px-0 py-2 focus-visible:ring-0 placeholder:text-gray-400"
            maxLength={30}
          />

          <Textarea
            placeholder="分享这一刻的想法..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] text-base resize-none border-0 p-0 focus-visible:ring-0 placeholder:text-gray-400"
          />
        </div>

        <TagSelector 
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          suggestedTags={suggestedTags}
        />

        <LocationButton />
      </form>

      <BottomNav />
    </div>
  )
}

export default CreatePost