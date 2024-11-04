import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface Address {
  id: string
  name: string
  phone: string
  detail: string
  isDefault?: boolean
}

interface AddressSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (address: Address) => void
  selectedId?: string
}

const addresses: Address[] = [
  {
    id: "1",
    name: "张三",
    phone: "138****8888",
    detail: "浙江省杭州市西湖区文三路 123 号",
    isDefault: true
  },
  {
    id: "2", 
    name: "李四",
    phone: "139****9999",
    detail: "浙江省杭州市滨江区网商路 599 号",
  }
]

export function AddressSelector({ open, onOpenChange, onSelect, selectedId }: AddressSelectorProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>选择收货地址</DialogTitle>
        </DialogHeader>
        
        <RadioGroup 
          defaultValue={selectedId} 
          className="space-y-3"
          onValueChange={(value) => {
            const selected = addresses.find(addr => addr.id === value)
            if (selected) {
              onSelect(selected)
              onOpenChange(false)
            }
          }}
        >
          {addresses.map((address) => (
            <div key={address.id} className="flex items-start space-x-3 p-3 rounded-lg border">
              <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
              <div className="flex-1 space-y-1">
                <Label htmlFor={address.id}>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{address.name}</span>
                    <span className="text-gray-500">{address.phone}</span>
                    {address.isDefault && (
                      <span className="text-xs px-1.5 py-0.5 bg-pink-50 text-pink-600 rounded">默认</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{address.detail}</p>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>

        <Button variant="outline" className="w-full mt-2">
          <MapPin className="mr-2 h-4 w-4" />
          添加新地址
        </Button>
      </DialogContent>
    </Dialog>
  )
}