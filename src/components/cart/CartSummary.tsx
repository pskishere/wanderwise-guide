import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface CartItem {
  id: number
  price: number
  quantity: number
  selected: boolean
}

interface CartSummaryProps {
  items: CartItem[]
  onCheckout: () => void
}

export const CartSummary = ({ items, onCheckout }: CartSummaryProps) => {
  const totalAmount = items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  const selectedCount = items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.quantity, 0)

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t p-4 shadow-lg"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">
            合计: <span className="text-xl font-bold text-pink-600 ml-1">¥{totalAmount}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            已选 {selectedCount} 件商品
          </div>
        </div>
        <Button 
          className="bg-pink-500 hover:bg-pink-600 px-8"
          size="lg"
          onClick={onCheckout}
          disabled={selectedCount === 0}
        >
          结算
        </Button>
      </div>
    </motion.div>
  )
}