import { BottomNav } from "@/components/BottomNav"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Avatar } from "@/components/ui/avatar"
import MDEditor from '@uiw/react-md-editor'
import { CreatePostHeader } from "@/components/post/CreatePostHeader"
import { MarkdownToolbar } from "@/components/post/MarkdownToolbar"
import { ImageUploader } from "@/components/post/ImageUploader"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false)
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
    
    if (!title.trim() && !content.trim()) {
      toast({
        variant: "destructive",
        description: "请输入内容后再发布",
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
  const maxCharacters = 2000
  const remainingCharacters = maxCharacters - characterCount
  const isOverLimit = remainingCharacters < 0

  const insertMarkdown = (type: string) => {
    let insertion = ''
    const textarea = document.querySelector('textarea')
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    switch (type) {
      case 'bold':
        insertion = `**${selectedText || '粗体文字'}**`
        break
      case 'italic':
        insertion = `*${selectedText || '斜体文字'}*`
        break
      case 'list':
        insertion = `\n- ${selectedText || '列表项'}`
        break
      case 'link':
        insertion = `[${selectedText || '链接文字'}](url)`
        break
      default:
        return
    }

    const newContent = content.substring(0, start) + insertion + content.substring(end)
    setContent(newContent)
  }

  return (
    <div className="min-h-screen bg-white">
      <CreatePostHeader 
        isSubmitting={isSubmitting}
        isOverLimit={isOverLimit}
        hasContent={Boolean(title.trim() || content.trim())}
      />
      
      <form id="post-form" onSubmit={handleSubmit} className="container max-w-2xl mx-auto px-4 pt-20 pb-32">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <img src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>

          <div className="flex-1 space-y-4">
            <Input
              placeholder="标题 (可选)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold border-0 px-0 placeholder:text-gray-400 focus-visible:ring-0"
            />

            <div className="space-y-2">
              <MarkdownToolbar 
                onInsert={insertMarkdown}
                showPreview={showMarkdownPreview}
                onTogglePreview={() => setShowMarkdownPreview(!showMarkdownPreview)}
              />

              {showMarkdownPreview ? (
                <div className="min-h-[150px] p-3 rounded-lg border">
                  <MDEditor.Markdown source={content} />
                </div>
              ) : (
                <textarea
                  placeholder="有什么新鲜事想分享给大家？支持 Markdown 格式"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[150px] text-lg resize-none border-0 focus:outline-none placeholder:text-gray-400"
                />
              )}
            </div>

            <ImageUploader 
              images={images}
              onUpload={handleImageUpload}
              onRemove={removeImage}
              characterCount={characterCount}
              remainingCharacters={remainingCharacters}
              isOverLimit={isOverLimit}
            />
          </div>
        </div>
      </form>

      <BottomNav />
    </div>
  )
}

export default CreatePost