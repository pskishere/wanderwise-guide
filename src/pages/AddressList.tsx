import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { MapPin, Plus, Edit2, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

const addresses = [
  {
    id: "1",
    name: "张三",
    phone: "138****8888",
    detail: "浙江省杭州市西湖区文三路 123 号",
    isDefault: true
  },
  {
    id: "2",
    name: "李四",
    phone: "139****9999",
    detail: "浙江省杭州市滨江区网商路 599 号",
    isDefault: false
  }
]

const AddressList = () => {
  const { toast } = useToast()

  const handleDelete = (id: string) => {
    toast({
      description: "地址删除成功",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-6 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">我的地址</h1>
          <Link to="/address/new">
            <Button className="rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              新增地址
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div 
              key={address.id}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{address.name}</span>
                      <span className="text-gray-500">{address.phone}</span>
                      {address.isDefault && (
                        <span className="text-xs px-1.5 py-0.5 bg-pink-50 text-pink-600 rounded">默认</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {address.detail}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/address/edit/${address.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddressList