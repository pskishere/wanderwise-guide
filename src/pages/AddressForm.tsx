import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// 模拟数据
const provinces = ["浙江省", "江苏省", "广东省"]
const cities = {
  "浙江省": ["杭州市", "宁波市", "温州市"],
  "江苏省": ["南京市", "苏州市", "无锡市"],
  "广东省": ["广州市", "深圳市", "东莞市"]
}
const districts = {
  "杭州市": ["西湖区", "滨江区", "余杭区"],
  "宁波市": ["海曙区", "江北区", "鄞州区"],
  "温州市": ["鹿城区", "龙湾区", "瓯海区"],
  "南京市": ["玄武区", "秦淮区", "建邺区"],
  "苏州市": ["姑苏区", "虎丘区", "吴中区"],
  "无锡市": ["梁溪区", "锡山区", "惠山区"],
  "广州市": ["天河区", "海珠区", "越秀区"],
  "深圳市": ["福田区", "南山区", "罗湖区"],
  "东莞市": ["莞城区", "东城区", "南城区"]
}

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

  const handleSelectChange = (value: string, field: 'province' | 'city' | 'district') => {
    setForm(prev => {
      const updates: Partial<typeof form> = { [field]: value }
      
      // 重置下级选项
      if (field === 'province') {
        updates.city = ''
        updates.district = ''
      } else if (field === 'city') {
        updates.district = ''
      }
      
      return { ...prev, ...updates }
    })
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
                <Label>省份</Label>
                <Select
                  value={form.province}
                  onValueChange={(value) => handleSelectChange(value, 'province')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map(province => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>城市</Label>
                <Select
                  value={form.city}
                  onValueChange={(value) => handleSelectChange(value, 'city')}
                  disabled={!form.province}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    {form.province && cities[form.province as keyof typeof cities].map(city => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>区县</Label>
                <Select
                  value={form.district}
                  onValueChange={(value) => handleSelectChange(value, 'district')}
                  disabled={!form.city}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    {form.city && districts[form.city as keyof typeof districts].map(district => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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