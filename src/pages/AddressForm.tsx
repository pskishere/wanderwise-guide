import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { AddressHeader } from "@/components/address/AddressHeader"
import { AddressFormFields } from "@/components/address/AddressFormFields"
import { Loader2 } from "lucide-react"

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
  const [isLoading, setIsLoading] = useState(false)
  
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
    setIsLoading(true)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      description: isEdit ? "地址修改成功" : "地址添加成功"
    })
    
    setIsLoading(false)
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
      
      <div className="container mx-auto px-4 pt-20 pb-24 max-w-lg">
        <AddressHeader isEdit={isEdit} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <AddressFormFields
            form={form}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            provinces={provinces}
            cities={cities}
            districts={districts}
          />

          <Button 
            type="submit" 
            className="w-full bg-pink-500 hover:bg-pink-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中
              </>
            ) : '保存'}
          </Button>
        </form>
      </div>

      <BottomNav />
    </div>
  )
}

export default AddressForm