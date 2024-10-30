import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BottomNav } from "@/components/BottomNav"
import { CreatePostHeader } from "@/components/post/CreatePostHeader"
import { ImageUploader } from "@/components/post/ImageUploader"
import { TagSelector } from "@/components/post/TagSelector"
import { MarkdownToolbar } from "@/components/post/MarkdownToolbar"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import dynamic from "@uiw/react-md-editor"

const MDEditor = dynamic

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)
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

  const handleMarkdownInsert = (type: string) => {
    const textarea = document.querySelector('textarea')
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value

    let insertion = ''
    switch (type) {
      case 'bold':
        insertion = `**${text.slice(start, end) || '粗体文字'}**`
        break
      case 'italic':
        insertion = `*${text.slice(start, end) || '斜体文字'}*`
        break
      case 'list':
        insertion = `\n- ${text.slice(start, end) || '列表项'}`
        break
      case 'link':
        insertion = `[${text.slice(start, end) || '链接文字'}](url)`
        break
    }

    const newContent = text.slice(0, start) + insertion + text.slice(end)
    setContent(newContent)
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
    <div className="min-h-screen bg-gray-100">
      <CreatePostHeader 
        isSubmitting={isSubmitting}
        hasContent={Boolean(title.trim() || content.trim())}
        hasImages={images.length > 0}
      />

      <form 
        id="post-form" 
        onSubmit={handleSubmit} 
        className="pt-16 pb-20 max-w-3xl mx-auto px-4 md:px-8 lg:px-0"
      >
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <ImageUploader 
              images={images}
              onUpload={handleImageUpload}
              onRemove={removeImage}
            />
          </div>

          <div className="px-6 py-8 space-y-8">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-500">标题</label>
              <Input
                id="title"
                placeholder="填写标题会有更多赞哦～"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl border-0 px-0 py-4 focus-visible:ring-0 placeholder:text-gray-400"
                maxLength={30}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-500">正文</label>
                <MarkdownToolbar 
                  onInsert={handleMarkdownInsert}
                  showPreview={showPreview}
                  onTogglePreview={() => setShowPreview(!showPreview)}
                />
              </div>
              
              {showPreview ? (
                <MDEditor.Markdown 
                  source={content} 
                  className="min-h-[400px] p-6 rounded-xl bg-white border border-gray-200 prose prose-sm max-w-none prose-p:my-2 prose-p:leading-relaxed prose-headings:font-bold prose-headings:my-3 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none hover:border-pink-100 transition-colors"
                />
              ) : (
                <Textarea
                  placeholder="分享这一刻的想法..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[400px] text-base resize-none border border-gray-200 p-6 focus-visible:ring-0 focus-visible:border-pink-100 placeholder:text-gray-400 rounded-xl transition-colors"
                />
              )}
            </div>
          </div>

          <div className="border-t border-gray-100">
            <TagSelector 
              selectedTags={selectedTags}
              onToggleTag={toggleTag}
              suggestedTags={suggestedTags}
            />
          </div>
        </div>
      </form>

      <BottomNav />
    </div>
  )
}

export default CreatePost