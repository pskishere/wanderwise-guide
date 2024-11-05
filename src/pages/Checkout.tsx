import { Navigation } from "@/components/Navigation"
import { BottomNav } from "@/components/BottomNav"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { AddressSelector } from "@/components/address/AddressSelector"
import { useState, useCallback, useEffect } from "react"
import { setSelectedAddress, setPaymentMethod, clearCheckout } from "@/store/checkoutSlice"
import { setCurrentOrder } from "@/store/orderSlice"
import { CheckoutAddress } from "@/components/checkout/CheckoutAddress"
import { CheckoutProducts } from "@/components/checkout/CheckoutProducts"
import { CheckoutPayment } from "@/components/checkout/CheckoutPayment"

const Checkout = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { selectedItems, selectedAddress, paymentMethod } = useSelector((state: RootState) => state.checkout)
  
  const [showAddressSelector, setShowAddressSelector] = useState(false)

  useEffect(() => {
    if (selectedItems.length === 0) {
      navigate('/cart')
    }
  }, [selectedItems, navigate])

  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const freight = 0

  const handlePaymentMethodChange = useCallback((value: 'alipay' | 'wechat') => {
    dispatch(setPaymentMethod(value))
  }, [dispatch])

  const handlePayment = () => {
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
    dispatch(clearCheckout())
    
    toast({
      description: "订单提交成功，正在跳转支付...",
    })
    
    setTimeout(() => {
      navigate('/orders')
    }, 1500)
  }

  const handleAddressSelect = useCallback((address: typeof selectedAddress) => {
    dispatch(setSelectedAddress(address))
    setShowAddressSelector(false)
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 max-w-3xl space-y-4">
        <CheckoutAddress 
          address={selectedAddress}
          onChangeAddress={() => setShowAddressSelector(true)}
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