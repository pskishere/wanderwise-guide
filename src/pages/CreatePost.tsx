import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import { BottomNav } from "@/components/BottomNav"
import { CreatePostHeader } from "@/components/post/CreatePostHeader"
import { CreatePostForm } from "@/components/post/CreatePostForm"
import { RootState } from "@/store/store"
import { setDraft, clearDraft, setLoading, addMockPost } from "@/store/slices/createPostSlice"

const CreatePost = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()
  const [showPreview, setShowPreview] = useState(false)
  
  const { draft, loading } = useSelector((state: RootState) => state.createPost)

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        dispatch(setDraft({ 
          images: [...draft.images, reader.result as string]
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const handleLocationSelect = (address: {
    province: string
    city: string
    district: string
    detail: string
  }) => {
    const locationText = `${address.province}${address.city}${address.district}${address.detail}`
    dispatch(setDraft({ location: locationText }))
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
      // Create a mock post
      const mockPost = {
        id: Date.now(),
        title: draft.title,
        content: draft.content,
        images: draft.images,
        tags: draft.tags,
        location: draft.location,
        author: {
          id: 1,
          name: "旅行者",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
        },
        products: draft.products,
        stats: {
          likes: 0,
          comments: 0,
          favorites: 0
        },
        createdAt: new Date().toISOString()
      }

      // Add mock post to Redux store
      dispatch(addMockPost(mockPost))
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

      <form id="post-form" onSubmit={handleSubmit}>
        <CreatePostForm
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
          onMarkdownInsert={handleMarkdownInsert}
          handleImageUpload={handleImageUpload}
          handleLocationSelect={handleLocationSelect}
        />
      </form>

      <BottomNav />
    </div>
  )
}

export default CreatePost