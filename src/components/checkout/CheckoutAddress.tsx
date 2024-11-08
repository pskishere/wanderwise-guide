import { MapPin } from "lucide-react"
import { AddressSelector } from "@/components/address/AddressSelector"

interface CheckoutAddressProps {
  address: {
    id: string
    name: string
    phone: string
    detail: string
  } | null
  onChangeAddress: (address: any) => void
}

export const CheckoutAddress = ({ address, onChangeAddress }: CheckoutAddressProps) => {
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <MapPin className="h-5 w-5 text-gray-400" />
        <span className="font-medium">收货地址</span>
      </div>
      
      <AddressSelector 
        value={address?.id}
        onSelect={onChangeAddress}
      />
      
      {address && (
        <div className="mt-2 text-sm text-gray-500">
          {address.detail}
        </div>
      )}
    </div>
  )
}