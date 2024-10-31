import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface AddressHeaderProps {
  isEdit: boolean
}

export const AddressHeader = ({ isEdit }: AddressHeaderProps) => {
  const navigate = useNavigate()
  
  return (
    <div className="flex items-center gap-4 mb-6">
      <button 
        onClick={() => navigate(-1)}
        className="text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="text-xl font-semibold">
        {isEdit ? "编辑收货地址" : "新增收货地址"}
      </h1>
    </div>
  )
}