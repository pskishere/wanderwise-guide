import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { AddressHeader } from "@/components/address/AddressHeader"
import { AddressFormFields } from "@/components/address/AddressFormFields"
import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { addAddress, updateAddress } from "@/store/addressSlice"

const AddressForm = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { id } = useParams()
  const dispatch = useDispatch()
  const addresses = useSelector((state: RootState) => state.address.addresses)
  const isEdit = !!id
  const [isLoading, setIsLoading] = useState(false)
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    province: "",
    city: "",
    district: "",
    detail: "",
    isDefault: false
  })

  useEffect(() => {
    if (isEdit) {
      const address = addresses.find(addr => addr.id === id)
      if (address) {
        setForm({
          name: address.name,
          phone: address.phone,
          province: address.province,
          city: address.city,
          district: address.district,
          detail: address.detail,
          isDefault: address.isDefault
        })
      }
    }
  }, [id, addresses, isEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const addressData = {
      ...form,
      id: isEdit ? id : String(Date.now())
    }
    
    if (isEdit) {
      dispatch(updateAddress(addressData))
    } else {
      dispatch(addAddress(addressData))
    }
    
    toast({
      description: isEdit ? "地址修改成功" : "地址添加成功"
    })
    
    setIsLoading(false)
    navigate(-1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSelectChange = (value: string, field: 'province' | 'city' | 'district') => {
    setForm(prev => {
      const updates: Partial<typeof form> = { [field]: value }
      
      // 重置下级选项
      if (field === 'province') {
        updates.city = ''
        updates.district = ''
      } else if (field === 'city') {
        updates.district = ''
      }
      
      return { ...prev, ...updates }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-24 max-w-lg">
        <AddressHeader isEdit={isEdit} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <AddressFormFields
            form={form}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />

          <Button 
            type="submit" 
            className="w-full bg-pink-500 hover:bg-pink-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中
              </>
            ) : '保存'}
          </Button>
        </form>
      </div>

      <BottomNav />
    </div>
  )
}

export default AddressForm