import { useState, useRef, TouchEvent } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Image } from "@/components/ui/image"
import { Minus, Plus } from "lucide-react"
import { CartItem } from "@/store/cartSlice"
import { cn } from "@/lib/utils"

interface CartItemCardProps {
  item: CartItem
  onSelect: (id: number, checked: boolean) => void
  onQuantityChange: (id: number, type: 'increase' | 'decrease' | 'input', value?: number) => void
  onDelete: (id: number) => void
}

export const CartItemCard = ({ item, onSelect, onQuantityChange, onDelete }: CartItemCardProps) => {
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const deleteWidth = 80 // 删除按钮宽度
  const threshold = deleteWidth / 2 // 触发删除的阈值

  const handleTouchStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsSwiping(true)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping) return
    
    const diff = startX - e.touches[0].clientX
    const newX = Math.max(Math.min(diff, deleteWidth), 0)
    setCurrentX(newX)
    
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(-${newX}px)`
    }
  }

  const handleTouchEnd = () => {
    setIsSwiping(false)
    
    if (currentX > threshold) {
      // 展开删除按钮
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(-${deleteWidth}px)`
      }
    } else {
      // 恢复原位
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(0)'
      }
      setCurrentX(0)
    }
  }

  return (
    <div className="relative overflow-hidden">
      <Card 
        ref={cardRef}
        className="p-3 sm:p-4 transition-transform duration-200"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-3">
          <div className="flex items-center justify-center w-6">
            <Checkbox 
              checked={item.selected}
              onCheckedChange={(checked) => onSelect(item.id, checked as boolean)}
            />
          </div>
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
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
                <span className="text-red-500">
                  <span className="text-xs">¥</span>
                  <span className="text-lg sm:text-xl font-bold">{item.price}</span>
                </span>
                {item.discount && (
                  <span className="text-xs text-red-500 border border-red-500 px-1.5 py-0.5 rounded-sm">
                    限时立减{item.discount}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                  退货包运费
                </span>
                <span className="text-xs text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                  7天无理由退货
                </span>
              </div>

              {item.deadline && (
                <div className="text-xs text-red-500">
                  截止时间 {item.deadline}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-7 w-7 sm:h-8 sm:w-8 rounded-full",
                    item.quantity <= 1 && "opacity-50"
                  )}
                  onClick={() => onQuantityChange(item.id, 'decrease')}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onQuantityChange(item.id, 'input', parseInt(e.target.value))}
                  className="w-10 h-7 sm:h-8 text-center p-0 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min={1}
                  max={99}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                  onClick={() => onQuantityChange(item.id, 'increase')}
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div 
        className="absolute right-0 top-0 bottom-0 bg-red-500 w-20 flex items-center justify-center text-white cursor-pointer"
        onClick={() => onDelete(item.id)}
      >
        删除
      </div>
    </div>
  )
}