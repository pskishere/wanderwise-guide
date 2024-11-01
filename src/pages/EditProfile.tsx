import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Camera, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { RootState } from "@/store/store"
import { setProfile, setLoading } from "@/store/userSlice"

const EditProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()
  
  const { profile, loading } = useSelector((state: RootState) => state.user)
  const [form, setForm] = useState({
    nickname: profile.nickname,
    userId: profile.userId,
    bio: profile.bio,
    avatar: profile.avatar
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm(prev => ({
          ...prev,
          avatar: reader.result as string
        }))
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
    dispatch(setLoading(true))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch(setProfile(form))
      toast({
        title: "更新成功",
        description: "个人资料已更新"
      })
      navigate("/profile")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "更新失败",
        description: "请稍后重试"
      })
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>返回</span>
          </button>
          <h1 className="text-xl font-semibold">编辑资料</h1>
          <div className="w-16" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-24 w-24">
                <AvatarImage src={form.avatar} alt="头像" />
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

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
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