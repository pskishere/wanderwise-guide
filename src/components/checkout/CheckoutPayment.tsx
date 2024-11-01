import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Wallet } from "lucide-react"
import { memo } from "react"

interface CheckoutPaymentProps {
  value: string
  onChange: (value: 'alipay' | 'wechat') => void
}

export const CheckoutPayment = memo(({ value, onChange }: CheckoutPaymentProps) => {
  return (
    <div className="bg-white rounded-xl p-4">
      <h2 className="font-medium mb-4">支付方式</h2>
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
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
  )
})

CheckoutPayment.displayName = 'CheckoutPayment'