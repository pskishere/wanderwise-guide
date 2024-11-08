import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  value?: string
  onSelect: (address: Address) => void
}

export function AddressSelector({ value, onSelect }: AddressSelectorProps) {
  const dispatch = useDispatch()
  const { addresses, loading, error } = useSelector((state: RootState) => state.address)

  useEffect(() => {
    dispatch(fetchAddresses() as any)
  }, [dispatch])

  if (loading) {
    return <Skeleton className="h-10 w-full" />
  }

  if (error) {
    return (
      <div className="text-center py-2 text-red-500 text-sm">
        加载地址失败，请重试
      </div>
    )
  }

  if (addresses.length === 0) {
    return (
      <div className="text-center py-2 text-gray-500 text-sm">
        暂无收货地址
      </div>
    )
  }

  return (
    <Select 
      value={value} 
      onValueChange={(value) => {
        const selected = addresses.find(addr => addr.id === value)
        if (selected) {
          onSelect(selected)
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="选择收货地址" />
      </SelectTrigger>
      <SelectContent>
        {addresses.map((address) => (
          <SelectItem key={address.id} value={address.id}>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-medium">{address.name}</span>
                <span className="text-gray-500">{address.phone}</span>
                {address.isDefault && (
                  <span className="text-xs px-1.5 py-0.5 bg-pink-50 text-pink-600 rounded">默认</span>
                )}
              </div>
              <p className="text-sm text-gray-600">{address.detail}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}