import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

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

export function AddressSelector({ open, onOpenChange, onSelect, selectedId }: AddressSelectorProps) {
  const addresses = useSelector((state: RootState) => state.address.addresses)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-w-md mx-5")}>
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
      </DialogContent>
    </Dialog>
  )
}