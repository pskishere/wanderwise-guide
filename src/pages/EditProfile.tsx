import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Camera, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

const EditProfile = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80")
  const [form, setForm] = useState({
    nickname: "旅行达人",
    userId: "XHSUID8888",
    bio: "在路上，寻找生活的诗意 ✨ 记录旅行的点点滴滴"
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 这里应该调用上传API，这里仅做演示
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "更新成功",
      description: "个人资料已更新"
    })
    
    setIsLoading(false)
    navigate("/profile")
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>返回</span>
          </button>
          <h1 className="text-xl font-semibold">编辑资料</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} alt="头像" />
                <AvatarFallback>头像</AvatarFallback>
              </Avatar>
              <label className="absolute -bottom-1 -right-1 h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                <Camera className="h-4 w-4 text-gray-600" />
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden" 
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">点击图标更换头像</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">昵称</Label>
              <Input
                id="nickname"
                name="nickname"
                value={form.nickname}
                onChange={handleInputChange}
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userId">小红书号</Label>
              <Input
                id="userId"
                name="userId"
                value={form.userId}
                onChange={handleInputChange}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500">小红书号不可修改</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">个人简介</Label>
              <Textarea
                id="bio"
                name="bio"
                value={form.bio}
                onChange={handleInputChange}
                maxLength={100}
                rows={3}
              />
              <p className="text-xs text-gray-500 text-right">{form.bio.length}/100</p>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中
              </>
            ) : '保存修改'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile