import { Button } from "@/components/ui/button"

interface CartItem {
  id: number
  price: number
  quantity: number
  selected: boolean
}

interface CartSummaryProps {
  items: CartItem[]
}

export const CartSummary = ({ items }: CartSummaryProps) => {
  const totalAmount = items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  const selectedCount = items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">
            合计: <span className="text-xl font-bold text-pink-600 ml-1">¥{totalAmount}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            已选 {selectedCount} 件商品
          </div>
        </div>
        <Button className="bg-pink-500 hover:bg-pink-600">
          结算
        </Button>
      </div>
    </div>
  )
}