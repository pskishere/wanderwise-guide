import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
      <div className="space-y-4">
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