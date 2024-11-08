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
        <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border">
          <Skeleton className="h-5 w-5 mt-1" />
          <div className="flex-1 space-y-2.5">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-52" />
          </div>
        </div>
      ))
    }

    if (error) {
      return (
        <div className="text-center py-6 text-red-500 text-base">
          加载地址失败，请重试
        </div>
      )
    }

    if (addresses.length === 0) {
      return (
        <div className="text-center py-6 text-gray-500 text-base">
          暂无收货地址
        </div>
      )
    }

    return addresses.map((address) => (
      <div key={address.id} className="flex items-start space-x-4 p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors">
        <RadioGroupItem value={address.id} id={address.id} className="mt-1.5 h-5 w-5" />
        <div className="flex-1 space-y-1.5">
          <Label htmlFor={address.id} className="cursor-pointer">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-medium text-base">{address.name}</span>
              <span className="text-gray-500 text-base">{address.phone}</span>
              {address.isDefault && (
                <span className="text-xs px-2 py-0.5 bg-pink-50 text-pink-600 rounded-full">默认</span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1.5 break-all">{address.detail}</p>
          </Label>
        </div>
      </div>
    ))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "max-w-md mx-auto fixed left-0 right-0 bottom-0 top-auto rounded-b-none sm:rounded-lg sm:top-[50%] sm:bottom-auto sm:translate-y-[-50%]",
        "p-0 gap-0 sm:p-6 sm:gap-4"
      )}>
        <DialogHeader className="p-4 sm:p-0">
          <DialogTitle className="text-lg font-semibold">选择收货地址</DialogTitle>
        </DialogHeader>
        
        <RadioGroup 
          defaultValue={selectedId} 
          className="space-y-3 max-h-[60vh] overflow-y-auto p-4 sm:p-0"
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