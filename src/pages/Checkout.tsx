import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { Image } from "@/components/ui/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MapPin, CreditCard, Wallet } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { AddressSelector } from "@/components/address/AddressSelector"
import { useState, useEffect } from "react"
import { setSelectedItems, setSelectedAddress, setPaymentMethod, setLoading } from "@/store/checkoutSlice"
import { setCurrentOrder } from "@/store/orderSlice"

const Checkout = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const cartItems = useSelector((state: RootState) => 
    state.cart.items.filter(item => item.selected)
  )
  const { selectedItems, selectedAddress, paymentMethod } = useSelector((state: RootState) => state.checkout)
  
  const [showAddressSelector, setShowAddressSelector] = useState(false)

  useEffect(() => {
    dispatch(setLoading(true))
    dispatch(setSelectedItems(cartItems))
    dispatch(setLoading(false))
  }, [dispatch, cartItems])

  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const freight = 0 // 免运费

  const handlePayment = () => {
    // 创建新订单
    const newOrder = {
      id: `ORD${Date.now()}`,
      status: "待发货",
      totalAmount,
      freight,
      address: selectedAddress,
      timeline: [
        {
          time: new Date().toISOString(),
          status: "订单创建成功"
        },
        {
          time: new Date().toISOString(),
          status: "支付成功"
        }
      ],
      items: selectedItems
    }
    
    dispatch(setCurrentOrder(newOrder))
    toast({
      description: "订单提交成功，正在跳转支付...",
    })
    
    setTimeout(() => {
      navigate('/orders')
    }, 1500)
  }

  const handleAddressSelect = (address: typeof selectedAddress) => {
    dispatch(setSelectedAddress(address))
    setShowAddressSelector(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-3xl space-y-4">
        {/* 收货地址 */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">{selectedAddress?.name}</span>
                  <span className="text-gray-500">{selectedAddress?.phone}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedAddress?.detail}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500"
              onClick={() => setShowAddressSelector(true)}
            >
              更换
            </Button>
          </div>
        </div>

        {/* 商品列表 */}
        <div className="bg-white rounded-xl divide-y">
          {selectedItems.map((item) => (
            <div key={item.id} className="flex gap-3 p-4">
              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  fallback="https://placehold.co/600x600/png?text=商品图片"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium leading-tight line-clamp-2">
                  {item.title}
                </h3>
                {item.specs && item.specs.length > 0 && (
                  <div className="mt-1">
                    <span className="text-xs px-1.5 py-0.5 bg-gray-50 rounded-sm text-gray-900">
                      {item.specs[0]}
                    </span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-500">¥</span>
                    <span className="font-medium">{item.price}</span>
                  </div>
                  <div className="text-sm text-gray-500">x{item.quantity}</div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="px-4 py-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">商品总价</span>
              <span>¥{totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">运费</span>
              <span>{freight ? `¥${freight}` : "免运费"}</span>
            </div>
          </div>
        </div>

        {/* 支付方式 */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-medium mb-4">支付方式</h2>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={(value: 'alipay' | 'wechat') => dispatch(setPaymentMethod(value))} 
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="alipay" id="alipay" />
                <Label htmlFor="alipay" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-500" />
                  支付宝
                </Label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="wechat" id="wechat" />
                <Label htmlFor="wechat" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-green-500" />
                  微信支付
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* 底部结算栏 */}
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-3">
          <div className="container mx-auto max-w-3xl flex items-center justify-between">
            <div className="text-sm">
              实付款：
              <span className="text-lg font-bold text-pink-500">
                ¥{totalAmount + freight}
              </span>
            </div>
            <Button 
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8"
              onClick={handlePayment}
            >
              立即支付
            </Button>
          </div>
        </div>

        {/* 地址选择器 */}
        <AddressSelector
          open={showAddressSelector}
          onOpenChange={setShowAddressSelector}
          onSelect={handleAddressSelect}
          selectedId={selectedAddress?.id}
        />
      </div>

      <BottomNav />
    </div>
  )
}

export default Checkout