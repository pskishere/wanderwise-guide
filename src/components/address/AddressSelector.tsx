import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { useEffect } from "react"
import { fetchAddresses } from "@/store/slices/addressSlice"
import { Skeleton } from "@/components/ui/skeleton"

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
  const dispatch = useDispatch()
  const { addresses, loading, error } = useSelector((state: RootState) => state.address)

  useEffect(() => {
    if (open) {
      dispatch(fetchAddresses() as any)
    }
  }, [dispatch, open])

  const renderContent = () => {
    if (loading) {
      return Array(3).fill(0).map((_, index) => (
        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
          <Skeleton className="h-4 w-4 mt-1" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      ))
    }

    if (error) {
      return (
        <div className="text-center py-4 text-red-500">
          加载地址失败，请重试
        </div>
      )
    }

    if (addresses.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          暂无收货地址
        </div>
      )
    }

    return addresses.map((address) => (
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
    ))
  }

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
          {renderContent()}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  )
}