import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Plus, Edit2, Trash2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { AddressForm } from "@/components/address/AddressForm"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Address {
  id: number
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

const fetchAddresses = async (): Promise<Address[]> => {
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      name: "张三",
      phone: "13800138000",
      province: "浙江省",
      city: "杭州市",
      district: "西湖区",
      detail: "文三路 478 号",
      isDefault: true
    },
    {
      id: 2,
      name: "李四",
      phone: "13900139000",
      province: "浙江省",
      city: "杭州市",
      district: "滨江区",
      detail: "江南大道 2588 号",
      isDefault: false
    }
  ]
}

const Address = () => {
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const { toast } = useToast()

  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: fetchAddresses
  })

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    toast({
      description: "地址已删除",
    })
  }

  const handleSetDefault = (id: number) => {
    toast({
      description: "已设为默认地址",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">收货地址</h1>
          <Button onClick={() => setShowForm(true)} className="gap-1">
            <Plus className="h-4 w-4" />
            新增地址
          </Button>
        </div>

        {showForm ? (
          <AddressForm 
            address={editingAddress}
            onClose={() => {
              setShowForm(false)
              setEditingAddress(null)
            }}
          />
        ) : (
          <div className="space-y-4">
            {addresses?.map((address) => (
              <Card key={address.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{address.name}</span>
                      <span className="text-gray-500">{address.phone}</span>
                      {address.isDefault && (
                        <span className="px-1.5 py-0.5 text-xs text-pink-600 bg-pink-50 rounded">默认</span>
                      )}
                    </div>
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                      <p className="text-sm">
                        {address.province} {address.city} {address.district} {address.detail}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <button 
                      onClick={() => handleEdit(address)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(address.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {!address.isDefault && (
                  <Button
                    variant="ghost" 
                    className="w-full mt-3 text-sm h-8"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    设为默认地址
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default Address