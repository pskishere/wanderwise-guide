import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tag, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/BottomNav"

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
      {/* Header */}
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
            disabled={isSubmitting || !title.trim() || !content.trim() || images.length === 0}
          >
            发布
          </Button>
        </div>
      </div>

      <form id="post-form" onSubmit={handleSubmit} className="pt-12 pb-20">
        {/* Image Upload */}
        <div className="p-4">
          {images.length === 0 ? (
            <label className="block aspect-[4/3] rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mb-2">
                  <Tag className="w-8 h-8 text-pink-500" />
                </div>
                <span className="text-sm font-medium">添加图片</span>
                <span className="text-xs mt-1 text-gray-400">最多9张｜建议比例3:4</span>
              </div>
            </label>
          ) : (
            <div className="grid grid-cols-3 gap-1">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square group">
                  <img
                    src={image}
                    alt={`上传图片 ${index + 1}`}
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-white text-sm">×</span>
                  </button>
                </div>
              ))}
              {images.length < 9 && (
                <label className="aspect-square border border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center cursor-pointer bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="text-2xl text-gray-300">+</span>
                  <span className="text-xs text-gray-400 mt-1">{9 - images.length}</span>
                </label>
              )}
            </div>
          )}
        </div>

        {/* Content */}
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

        {/* Tags */}
        <div className="mt-6 px-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">添加标签</span>
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
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mt-6 px-4">
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <MapPin className="w-4 h-4" />
            <span>添加地点</span>
          </button>
        </div>
      </form>

      <BottomNav />
    </div>
  )
}

export default CreatePost