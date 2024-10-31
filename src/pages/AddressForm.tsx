import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const AddressForm = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { id } = useParams()
  const isEdit = !!id
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    province: "",
    city: "",
    district: "",
    detail: "",
    isDefault: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      description: isEdit ? "地址修改成功" : "地址添加成功"
    })
    
    navigate(-1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-6 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">
            {isEdit ? "编辑收货地址" : "新增收货地址"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">收货人</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="请输入姓名"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">手机号码</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="请输入手机号"
                  value={form.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="province">省份</Label>
                <Input
                  id="province"
                  name="province"
                  placeholder="请选择"
                  value={form.province}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">城市</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="请选择"
                  value={form.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">区县</Label>
                <Input
                  id="district"
                  name="district"
                  placeholder="请选择"
                  value={form.district}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="detail">详细地址</Label>
              <Input
                id="detail"
                name="detail"
                placeholder="请输入详细地址，如街道、门牌号等"
                value={form.detail}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={form.isDefault}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-600"
              />
              <Label htmlFor="isDefault">设为默认地址</Label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            保存
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddressForm