import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { setSelectedAddress, setPaymentMethod } from "@/store/slices/checkoutSlice"
import { setCurrentOrder } from "@/store/slices/orderSlice"
import { CheckoutAddress } from "@/components/checkout/CheckoutAddress"
import { CheckoutProducts } from "@/components/checkout/CheckoutProducts"
import { CheckoutPayment } from "@/components/checkout/CheckoutPayment"

const Checkout = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { selectedItems, selectedAddress, paymentMethod } = useSelector((state: RootState) => state.checkout)

  // 如果没有选中的商品，重定向回购物车页面
  useEffect(() => {
    if (!selectedItems || selectedItems.length === 0) {
      navigate('/cart')
    }
  }, [selectedItems, navigate])

  const totalAmount = selectedItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0
  const freight = 0

  const handlePaymentMethodChange = (value: 'alipay' | 'wechat') => {
    dispatch(setPaymentMethod(value))
  }

  const handlePayment = () => {
    if (!selectedAddress) {
      toast({
        description: "请选择收货地址",
      })
      return
    }

    if (!paymentMethod) {
      toast({
        description: "请选择支付方式",
      })
      return
    }

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
        }
      ],
      items: selectedItems
    }
    
    dispatch(setCurrentOrder(newOrder))
    toast({
      description: "订单提交成功，正在跳转支付...",
    })
    
    // 延迟跳转以显示提示
    setTimeout(() => {
      navigate('/orders')
    }, 1500)
  }

  const handleAddressSelect = (address: typeof selectedAddress) => {
    dispatch(setSelectedAddress(address))
  }

  if (!selectedItems || selectedItems.length === 0) {
    return null // 等待重定向
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-3xl space-y-4">
        <CheckoutAddress 
          address={selectedAddress}
          onChangeAddress={handleAddressSelect}
        />

        <CheckoutProducts 
          products={selectedItems}
          totalAmount={totalAmount}
          freight={freight}
        />

        <CheckoutPayment
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        />

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
      </div>

      <BottomNav />
    </div>
  )
}

export default Checkout