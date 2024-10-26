import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Minus, Plus, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

interface CartItemProps {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  shop: string
  selected: boolean
  onSelect: (id: number, checked: boolean) => void
  onQuantityChange: (id: number, type: 'increase' | 'decrease') => void
  onDelete: (id: number) => void
}

export const CartItem = ({
  id,
  title,
  price,
  image,
  quantity,
  shop,
  selected,
  onSelect,
  onQuantityChange,
  onDelete
}: CartItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-4">
          <Checkbox 
            checked={selected}
            onCheckedChange={(checked) => onSelect(id, checked as boolean)}
            className="h-5 w-5"
          />
          <div className="flex flex-1 gap-4">
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src={image}
                alt={title}
                className="w-20 h-20 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium line-clamp-2 group-hover:text-pink-500 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{shop}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-pink-600">
                  ¥{price}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => onQuantityChange(id, 'decrease')}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => onQuantityChange(id, 'increase')}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-red-500 transition-colors"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}