import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { parseAddress } from "@/utils/addressParser"
import { MapSearch } from "./MapSearch"

interface AddressFormFieldsProps {
  form: {
    name: string
    phone: string
    detail: string
    isDefault: boolean
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const AddressFormFields = ({
  form,
  handleInputChange,
}: AddressFormFieldsProps) => {
  const { toast } = useToast()

  const handleMapAddressSelect = (address: {
    detail: string
  }) => {
    // Update detail address
    const detailEvent = {
      target: { name: 'detail', value: address.detail }
    } as React.ChangeEvent<HTMLTextAreaElement>
    handleInputChange(detailEvent)
  }

  const handleDetailPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text')
    const parsed = parseAddress(text)
    
    if (!parsed.name && !parsed.phone && !parsed.detail) {
      toast({
        variant: "destructive",
        description: "无法识别地址格式，请检查后重试",
      })
      return
    }

    // 通过创建合成事件来触发表单更新
    const createChangeEvent = (name: string, value: string) => {
      return {
        target: { name, value }
      } as React.ChangeEvent<HTMLInputElement>
    }

    if (parsed.name) handleInputChange(createChangeEvent('name', parsed.name))
    if (parsed.phone) handleInputChange(createChangeEvent('phone', parsed.phone))
    if (parsed.detail) handleInputChange(createChangeEvent('detail', parsed.detail))

    toast({
      description: "地址解析成功",
    })
  }

  return (
    <div className="space-y-6">
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

      <div className="space-y-2">
        <Label>地图搜索</Label>
        <MapSearch onAddressSelect={handleMapAddressSelect} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="detail">详细地址</Label>
        <Textarea
          id="detail"
          name="detail"
          placeholder="请输入详细地址"
          value={form.detail}
          onChange={handleInputChange}
          onPaste={handleDetailPaste}
          required
          className="min-h-[120px] resize-none rounded-lg border-2 border-gray-100 p-4 focus-visible:ring-0 focus-visible:border-pink-100 placeholder:text-gray-400 transition-colors"
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