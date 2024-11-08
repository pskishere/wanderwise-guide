import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface CheckoutAddressProps {
  address: {
    id: string
    name: string
    phone: string
    detail: string
  } | null
  onChangeAddress: () => void
}

export const CheckoutAddress = ({ address, onChangeAddress }: CheckoutAddressProps) => {
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-gray-400" />
          <div>
            <div className="flex items-center gap-4">
              <span className="font-medium">{address?.name}</span>
              <span className="text-gray-500">{address?.phone}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {address?.detail}
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500"
          onClick={onChangeAddress}
        >
          更换
        </Button>
      </div>
    </div>
  )
}