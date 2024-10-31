import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { parseAddress } from "@/utils/addressParser"
import { getProvinces, getCitiesByProvince, getDistrictsByCity, getNameByCode } from "@/utils/addressData"
import { useEffect, useState } from "react"

interface AddressFormFieldsProps {
  form: {
    name: string
    phone: string
    province: string
    city: string
    district: string
    detail: string
    isDefault: boolean
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (value: string, field: 'province' | 'city' | 'district') => void
}

export const AddressFormFields = ({
  form,
  handleInputChange,
  handleSelectChange,
}: AddressFormFieldsProps) => {
  const { toast } = useToast()
  const [provinces, setProvinces] = useState<{ code: string; name: string }[]>([])
  const [cities, setCities] = useState<{ code: string; name: string }[]>([])
  const [districts, setDistricts] = useState<{ code: string; name: string }[]>([])

  // 初始化省份数据
  useEffect(() => {
    setProvinces(getProvinces())
  }, [])

  // 当省份改变时更新城市
  useEffect(() => {
    if (form.province) {
      setCities(getCitiesByProvince(form.province))
      setDistricts([]) // 清空区县
    }
  }, [form.province])

  // 当城市改变时更新区县
  useEffect(() => {
    if (form.city) {
      setDistricts(getDistrictsByCity(form.city))
    }
  }, [form.city])

  const handleDetailPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text')
    const parsed = parseAddress(text, 
      provinces.map(p => p.name),
      provinces.reduce((acc, p) => ({
        ...acc,
        [p.name]: getCitiesByProvince(p.code).map(c => c.name)
      }), {}),
      cities.reduce((acc, c) => ({
        ...acc,
        [c.name]: getDistrictsByCity(c.code).map(d => d.name)
      }), {})
    )
    
    if (!parsed.name && !parsed.phone && !parsed.province) {
      toast({
        variant: "destructive",
        description: "无法识别地址格式，请检查后重试",
      })
      return
    }

    // 通过创建合成事件来触发表单更新
    const createChangeEvent = (name: string, value: string) => {
      return {
        target: { name, value, type: 'text' }
      } as React.ChangeEvent<HTMLInputElement>
    }

    if (parsed.name) handleInputChange(createChangeEvent('name', parsed.name))
    if (parsed.phone) handleInputChange(createChangeEvent('phone', parsed.phone))
    
    // 找到对应的代码并更新
    if (parsed.province) {
      const provinceCode = provinces.find(p => p.name === parsed.province)?.code
      if (provinceCode) handleSelectChange(provinceCode, 'province')
    }
    if (parsed.city) {
      const cityCode = cities.find(c => c.name === parsed.city)?.code
      if (cityCode) handleSelectChange(cityCode, 'city')
    }
    if (parsed.district) {
      const districtCode = districts.find(d => d.name === parsed.district)?.code
      if (districtCode) handleSelectChange(districtCode, 'district')
    }
    if (parsed.detail) handleInputChange(createChangeEvent('detail', parsed.detail))

    toast({
      description: "地址解析成功",
    })
  }

  return (
    <div className="space-y-6">
      {/* Recipient Information Section */}
      <div className="space-y-4">
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

      {/* Address Section */}
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
                <SelectItem key={province.code} value={province.code}>
                  {province.name}
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
              {cities.map(city => (
                <SelectItem key={city.code} value={city.code}>
                  {city.name}
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
              {districts.map(district => (
                <SelectItem key={district.code} value={district.code}>
                  {district.name}
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
          placeholder="请输入或粘贴完整地址，将自动解析"
          value={form.detail}
          onChange={handleInputChange}
          onPaste={handleDetailPaste}
          required
          className="h-24 align-top"
        />
        <p className="text-sm text-gray-500">
          支持粘贴格式：张三 13800138000 浙江省杭州市西湖区文三路 123 号
        </p>
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
  )
}