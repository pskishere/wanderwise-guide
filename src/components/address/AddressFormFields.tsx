import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

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
  provinces: string[]
  cities: Record<string, string[]>
  districts: Record<string, string[]>
}

export const AddressFormFields = ({
  form,
  handleInputChange,
  handleSelectChange,
  provinces,
  cities,
  districts
}: AddressFormFieldsProps) => {
  const [showPasteArea, setShowPasteArea] = useState(false)
  const { toast } = useToast()

  const parseAddress = (text: string) => {
    // 简单的地址解析逻辑
    const phoneRegex = /1[3-9]\d{9}/
    const phone = text.match(phoneRegex)?.[0] || ""
    
    // 提取姓名 (假设姓名在手机号前后的2-4个字符)
    const nameRegex = new RegExp(`(.{2,4}).*${phone}|${phone}.*?(.{2,4})`)
    const nameMatch = text.match(nameRegex)
    const name = (nameMatch?.[1] || nameMatch?.[2] || "").trim()

    // 提取省市区
    let province = ""
    let city = ""
    let district = ""
    
    for (const p of provinces) {
      if (text.includes(p)) {
        province = p
        const citiesInProvince = cities[p]
        for (const c of citiesInProvince) {
          if (text.includes(c)) {
            city = c
            const districtsInCity = districts[c]
            for (const d of districtsInCity) {
              if (text.includes(d)) {
                district = d
                break
              }
            }
            break
          }
        }
        break
      }
    }

    // 提取详细地址
    let detail = text
      .replace(phone, "")
      .replace(name, "")
      .replace(province, "")
      .replace(city, "")
      .replace(district, "")
      .replace(/[,，。\s]/g, "")
      .trim()

    return { name, phone, province, city, district, detail }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData('text')
    const parsed = parseAddress(text)
    
    // 通过创建合成事件来触发表单更新
    const createChangeEvent = (name: string, value: string) => {
      return {
        target: { name, value, type: 'text' }
      } as React.ChangeEvent<HTMLInputElement>
    }

    if (parsed.name) handleInputChange(createChangeEvent('name', parsed.name))
    if (parsed.phone) handleInputChange(createChangeEvent('phone', parsed.phone))
    if (parsed.province) handleSelectChange(parsed.province, 'province')
    if (parsed.city) handleSelectChange(parsed.city, 'city')
    if (parsed.district) handleSelectChange(parsed.district, 'district')
    if (parsed.detail) handleInputChange(createChangeEvent('detail', parsed.detail))

    setShowPasteArea(false)
    toast({
      description: "地址解析成功",
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-right">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowPasteArea(!showPasteArea)}
        >
          {showPasteArea ? "取消" : "粘贴地址"}
        </Button>
      </div>

      {showPasteArea && (
        <div className="space-y-2">
          <Label>粘贴完整地址</Label>
          <Textarea
            placeholder="请粘贴包含姓名、电话、地址的完整内容"
            className="h-24"
            onPaste={handlePaste}
          />
          <p className="text-sm text-gray-500">
            支持格式：张三 13800138000 浙江省杭州市西湖区文三路 123 号
          </p>
        </div>
      )}

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
                {form.province && cities[form.province].map(city => (
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
                {form.city && districts[form.city].map(district => (
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
          className="h-24 align-top"
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
  )
}
