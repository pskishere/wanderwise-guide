import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { deleteAddress } from "@/store/slices/addressSlice"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const AddressList = () => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const addresses = useSelector((state: RootState) => state.address.addresses)

  const handleDelete = (id: string) => {
    dispatch(deleteAddress(id))
    toast({
      description: "地址删除成功",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-24 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">我的地址</h1>
          <Link to="/address/new">
            <Button className="rounded-full bg-pink-500 hover:bg-pink-600">
              <Plus className="h-4 w-4 mr-2" />
              新增地址
            </Button>
          </Link>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 mb-4">暂无收货地址</p>
            <Link to="/address/new">
              <Button variant="outline" className="rounded-full">
                添加地址
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div 
                key={address.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{address.name}</span>
                        <span className="text-gray-500">{address.phone}</span>
                        {address.isDefault && (
                          <span className="text-xs px-2 py-0.5 bg-pink-50 text-pink-600 rounded-full">默认</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {address.detail}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/address/edit/${address.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-pink-50 hover:text-pink-500">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除</AlertDialogTitle>
                          <AlertDialogDescription>
                            确定要删除这个收货地址吗？此操作无法撤销。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDelete(address.id)}
                          >
                            删除
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default AddressList