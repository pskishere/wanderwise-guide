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

          <div className="space-y-2">
            <MarkdownToolbar 
              onInsert={handleMarkdownInsert}
              showPreview={showPreview}
              onTogglePreview={() => setShowPreview(!showPreview)}
            />
            {showPreview ? (
              <div className="min-h-[100px] p-3 rounded-lg bg-white border">
                <MDEditor.Markdown source={content} />
              </div>
            ) : (
              <Textarea
                placeholder="分享这一刻的想法..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] text-base resize-none border-0 p-0 focus-visible:ring-0 placeholder:text-gray-400"
              />
            )}
          </div>
        </div>

        <TagSelector 
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          suggestedTags={suggestedTags}
        />
      </form>

      <BottomNav />
    </div>
  )
}

export default CreatePost