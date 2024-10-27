import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"
import { useState } from "react"

interface Address {
  id: number
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

interface AddressFormProps {
  address?: Address | null
  onClose: () => void
}

export const AddressForm = ({ address, onClose }: AddressFormProps) => {
  const { toast } = useToast()
  const [form, setForm] = useState({
    name: address?.name || "",
    phone: address?.phone || "",
    province: address?.province || "",
    city: address?.city || "",
    district: address?.district || "",
    detail: address?.detail || "",
    isDefault: address?.isDefault || false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      description: address ? "地址已更新" : "地址已添加",
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium">{address ? "编辑地址" : "新增地址"}</h2>
        <button 
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">收货人</Label>
        <Input
          id="name"
          value={form.name}
          onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
          placeholder="请输入收货人姓名"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">手机号码</Label>
        <Input
          id="phone"
          value={form.phone}
          onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="请输入手机号码"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-2">
          <Label htmlFor="province">省份</Label>
          <Input
            id="province"
            value={form.province}
            onChange={e => setForm(prev => ({ ...prev, province: e.target.value }))}
            placeholder="省份"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">城市</Label>
          <Input
            id="city"
            value={form.city}
            onChange={e => setForm(prev => ({ ...prev, city: e.target.value }))}
            placeholder="城市"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="district">区县</Label>
          <Input
            id="district"
            value={form.district}
            onChange={e => setForm(prev => ({ ...prev, district: e.target.value }))}
            placeholder="区县"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="detail">详细地址</Label>
        <Input
          id="detail"
          value={form.detail}
          onChange={e => setForm(prev => ({ ...prev, detail: e.target.value }))}
          placeholder="街道门牌号等"
          required
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" className="flex-1">
          保存
        </Button>
        <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
          取消
        </Button>
      </div>
    </form>
  )
}