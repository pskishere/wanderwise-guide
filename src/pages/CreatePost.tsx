import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, X, Globe2, ArrowLeft, Bold, Italic, List, Link, Image as ImageIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import MDEditor from '@uiw/react-md-editor'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false)
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
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 h-14 max-w-2xl mx-auto">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-bold">创建新帖子</span>
          </div>
          <Button
            type="submit"
            form="post-form"
            size="sm"
            className="rounded-full bg-blue-500 hover:bg-blue-600 px-4"
            disabled={isSubmitting || isOverLimit || (!title.trim() && !content.trim())}
          >
            发布
          </Button>
        </div>
        <Separator />
      </div>
      
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
              <div className="flex items-center gap-1 border-b pb-2">
                <button
                  type="button"
                  onClick={() => insertMarkdown('bold')}
                  className="p-1.5 hover:bg-gray-100 rounded"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('italic')}
                  className="p-1.5 hover:bg-gray-100 rounded"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('list')}
                  className="p-1.5 hover:bg-gray-100 rounded"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('link')}
                  className="p-1.5 hover:bg-gray-100 rounded"
                >
                  <Link className="w-4 h-4" />
                </button>
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
                  className={`text-xs px-2 py-1 rounded ${
                    showMarkdownPreview ? 'bg-blue-50 text-blue-500' : 'hover:bg-gray-100'
                  }`}
                >
                  预览
                </button>
              </div>

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

            <Separator className="my-3" />

            <div className="flex items-center justify-between">
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
                <button 
                  type="button" 
                  className="p-2 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <Globe2 className="w-5 h-5 text-blue-500" />
                </button>
              </div>

              {characterCount > 0 && (
                <div className="flex items-center gap-2">
                  <Separator orientation="vertical" className="h-6" />
                  <div className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                    {remainingCharacters}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>

      <BottomNav />
    </div>
  )
}

export default CreatePost