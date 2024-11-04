import { MapPin } from "lucide-react"

interface OrderAddressProps {
  name: string
  phone: string
  detail: string
}

export const OrderAddress = ({ name, phone, detail }: OrderAddressProps) => {
  return (
    <div className="bg-white rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        <MapPin className="h-4 w-4" />
        <span className="text-sm">收货地址</span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-4">
          <span className="font-medium">{name}</span>
          <span className="text-gray-500">{phone}</span>
        </div>
        <p className="text-gray-600 text-sm">{detail}</p>
      </div>
    </div>
  )
}