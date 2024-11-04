import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BottomNav } from "@/components/BottomNav"
import { CreatePostHeader } from "@/components/post/CreatePostHeader"
import { ImageUploader } from "@/components/post/ImageUploader"
import { TagSelector } from "@/components/post/TagSelector"
import { MarkdownToolbar } from "@/components/post/MarkdownToolbar"
import { RootState } from "@/store/store"
import { setDraft, addImage, removeImage, toggleTag, clearDraft, setLoading } from "@/store/createPostSlice"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import dynamic from "@uiw/react-md-editor"

const MDEditor = dynamic

const CreatePost = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()
  const [showPreview, setShowPreview] = useState(false)
  
  const { draft, loading } = useSelector((state: RootState) => state.createPost)
  const suggestedTags = ["旅行", "美食", "穿搭", "护肤", "数码", "生活", "购物"]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files).map(file => URL.createObjectURL(file))
    if (draft.images.length + newImages.length > 9) {
      toast({
        variant: "destructive",
        description: "最多只能上传9张图片",
      })
      return
    }
    newImages.forEach(image => dispatch(addImage(image)))
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
    dispatch(setDraft({ content: newContent }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!draft.title.trim() && !draft.content.trim()) {
      toast({
        variant: "destructive",
        description: "请输入内容后再发布",
      })
      return
    }

    if (draft.images.length === 0) {
      toast({
        variant: "destructive",
        description: "请至少上传一张图片",
      })
      return
    }

    dispatch(setLoading(true))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch(clearDraft())
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
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <CreatePostHeader 
        isSubmitting={loading}
        hasContent={Boolean(draft.title.trim() || draft.content.trim())}
        hasImages={draft.images.length > 0}
      />

      <form id="post-form" onSubmit={handleSubmit} className="pt-12 pb-20">
        <div className="p-4">
          <ImageUploader 
            images={draft.images}
            onUpload={handleImageUpload}
            onRemove={(index) => dispatch(removeImage(index))}
          />
        </div>

        <div className="px-4 space-y-4">
          <Input
            placeholder="标题～"
            value={draft.title}
            onChange={(e) => dispatch(setDraft({ title: e.target.value }))}
            className="text-small border-0 px-2 py-2 focus-visible:ring-0 placeholder:text-gray-400"
            maxLength={30}
          />

          <div className="space-y-2">
            <MarkdownToolbar 
              onInsert={handleMarkdownInsert}
              showPreview={showPreview}
              onTogglePreview={() => setShowPreview(!showPreview)}
            />
            {showPreview ? (
              <MDEditor.Markdown 
                source={draft.content} 
                className="min-h-[200px] p-4 rounded-lg bg-white border-2 border-gray-100 prose prose-sm max-w-none prose-p:my-2 prose-p:leading-relaxed prose-headings:font-bold prose-headings:my-3 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none hover:border-pink-100 transition-colors"
              />
            ) : (
              <Textarea
                placeholder="分享这一刻的想法..."
                value={draft.content}
                onChange={(e) => dispatch(setDraft({ content: e.target.value }))}
                className="min-h-[200px] text-base resize-none border-2 border-gray-100 p-4 focus-visible:ring-0 focus-visible:border-pink-100 placeholder:text-gray-400 rounded-lg transition-colors"
              />
            )}
          </div>
        </div>

        <TagSelector 
          selectedTags={draft.tags}
          onToggleTag={(tag) => dispatch(toggleTag(tag))}
          suggestedTags={suggestedTags}
        />
      </form>

      <BottomNav />
    </div>
  )
}

export default CreatePost