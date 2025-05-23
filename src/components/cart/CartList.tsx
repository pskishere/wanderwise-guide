import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { toggleSelectItem, updateQuantity, removeItem } from "@/store/cartSlice"
import { Image } from "@/components/ui/image"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { useState } from "react"
import { CartSkeleton } from "./CartSkeleton"

interface CartListProps {
  isLoading: boolean
}

export const CartList = ({ isLoading }: CartListProps) => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)
  const [swipedItemId, setSwipedItemId] = useState<number | null>(null)

  const handleQuantityChange = (id: number, type: 'increase' | 'decrease' | 'input', value?: number) => {
    let newQuantity: number
    
    if (type === 'input' && value !== undefined) {
      newQuantity = Math.max(1, Math.min(99, value))
    } else {
      const currentItem = items.find(item => item.id === id)
      const currentQuantity = currentItem?.quantity || 1
      newQuantity = type === 'increase' ? currentQuantity + 1 : currentQuantity - 1
    }

    if (newQuantity >= 1 && newQuantity <= 99) {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
      toast({
        description: type === 'increase' ? "商品数量已增加" : "商品数量已减少",
      })
    }
  }

  const handleCheckboxChange = (id: number, checked: boolean) => {
    dispatch(toggleSelectItem(id))
  }

  const handleDelete = (id: number) => {
    dispatch(removeItem(id))
    setSwipedItemId(null)
    toast({
      description: "商品已删除",
    })
  }

  const handleDragEnd = (info: PanInfo, id: number) => {
    if (info.offset.x < -100) {
      setSwipedItemId(id)
    } else {
      setSwipedItemId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array(2).fill(0).map((_, i) => (
          <CartSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden rounded-lg"
          >
            <div className="absolute right-0 top-0 bottom-0 w-[100px] bg-red-500 rounded-r-lg flex items-center justify-center">
              <Button
                variant="ghost"
                className="text-white hover:text-white/90"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="h-6 w-6" />
              </Button>
            </div>
            <motion.div
              drag="x"
              dragConstraints={{ left: -100, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => handleDragEnd(info, item.id)}
              animate={{ x: swipedItemId === item.id ? -100 : 0 }}
              className="relative cursor-grab active:cursor-grabbing bg-white rounded-lg"
            >
              <Card className="p-3 sm:p-4 bg-white touch-none">
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-6">
                    <Checkbox 
                      checked={item.selected}
                      onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                      className="border-pink-500 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500 data-[state=checked]:text-white"
                    />
                  </div>
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      fallback="https://placehold.co/600x600/png?text=商品图片"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="space-y-1.5">
                      <h3 className="text-sm sm:text-base font-medium leading-tight line-clamp-2">{item.title}</h3>
                      {item.specs && item.specs.length > 0 && (
                        <div className="inline-flex">
                          <span className="text-xs px-1.5 py-0.5 bg-gray-50 rounded-sm text-gray-900">
                            {item.specs[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500">
                          <span className="text-xs">¥</span>
                          <span className="text-lg sm:text-xl font-bold">{item.price}</span>
                        </span>
                        {item.discount && (
                          <span className="text-xs text-pink-500 border border-pink-500 px-1.5 py-0.5 rounded-sm">
                            限时立减{item.discount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 数量编辑器独立一行并靠右 */}
                <div className="flex justify-end mt-3">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                      onClick={() => handleQuantityChange(item.id, 'decrease')}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, 'input', parseInt(e.target.value))}
                      className="w-10 h-7 sm:h-8 text-center p-0 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      min={1}
                      max={99}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                      onClick={() => handleQuantityChange(item.id, 'increase')}
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}