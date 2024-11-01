import { Navigation } from "@/components/Navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { setPaymentMethod } from "@/store/checkoutSlice"
import { useCallback } from "react"

const Checkout = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const dispatch = useDispatch()
  const { selectedItems, selectedAddress, paymentMethod } = useSelector(
    (state: RootState) => state.checkout
  )

  const totalAmount = selectedItems.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  const handlePaymentMethodChange = useCallback((value: string) => {
    dispatch(setPaymentMethod(value as 'alipay' | 'wechat'))
  }, [dispatch])

  const handleSubmit = () => {
    if (!selectedAddress) {
      toast({
        variant: "destructive",
        description: "请选择收货地址",
      })
      return
    }

    if (!paymentMethod) {
      toast({
        variant: "destructive",
        description: "请选择支付方式",
      })
      return
    }

    // 处理订单提交逻辑
    toast({
      description: "订单提交成功",
    })
    navigate("/orders")
  }

  if (selectedItems.length === 0) {
    navigate("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container max-w-2xl mx-auto px-4 py-20">
        {/* 收货地址 */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium">收货地址</h2>
            <Button 
              variant="ghost" 
              className="text-pink-500 hover:text-pink-600"
              onClick={() => navigate("/address")}
            >
              选择地址
            </Button>
          </div>
          {selectedAddress ? (
            <div>
              <div className="flex items-center gap-4 text-sm">
                <span>{selectedAddress.name}</span>
                <span>{selectedAddress.phone}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {selectedAddress.detail}
              </div>
            </div>
          ) : (
            <div className="text-gray-500">请选择收货地址</div>
          )}
        </div>

        {/* 商品列表 */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">商品清单</h2>
          <div className="space-y-4">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  {item.specs && (
                    <div className="mt-1">
                      <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded">
                        {item.specs.join(" ")}
                      </span>
                    </div>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-pink-500">
                      <span className="text-xs">¥</span>
                      <span className="text-lg font-medium">{item.price}</span>
                    </span>
                    <span className="text-sm text-gray-500">x{item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 支付方式 */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">支付方式</h2>
          <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alipay" id="alipay" />
              <Label htmlFor="alipay">支付宝</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value="wechat" id="wechat" />
              <Label htmlFor="wechat">微信支付</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 提交订单 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 border-t">
          <div className="container max-w-2xl mx-auto flex items-center justify-between">
            <div>
              <span className="text-sm">实付金额：</span>
              <span className="text-pink-500">
                <span className="text-sm">¥</span>
                <span className="text-xl font-bold">{totalAmount}</span>
              </span>
            </div>
            <Button 
              className="bg-pink-500 hover:bg-pink-600 text-white px-8"
              onClick={handleSubmit}
            >
              提交订单
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout