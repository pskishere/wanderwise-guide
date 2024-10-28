import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { CartSkeleton } from "./CartSkeleton"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { toggleSelectItem, updateQuantity, removeItem } from "@/store/cartSlice"
import { Image } from "@/components/ui/image"
import { useState, useRef, TouchEvent } from "react"

export const CartList = ({ isLoading }: { isLoading: boolean }) => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)
  
  // 侧滑状态管理
  const [touchStart, setTouchStart] = useState<number>(0)
  const [swiping, setSwiping] = useState<number | null>(null)
  const swipeThreshold = 80 // 触发删除的阈值
  const deleteButtonWidth = 80 // 删除按钮宽度
  const touchRef = useRef<number>(0)

  const handleTouchStart = (e: TouchEvent, id: number) => {
    setTouchStart(e.touches[0].clientX)
    touchRef.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: TouchEvent, id: number) => {
    const currentTouch = e.touches[0].clientX
    const diff = touchRef.current - currentTouch

    if (diff > 0 && diff <= deleteButtonWidth) {
      setSwiping(id)
      const element = e.currentTarget as HTMLElement
      element.style.transform = `translateX(-${diff}px)`
    }
  }

  const handleTouchEnd = (e: TouchEvent, id: number) => {
    const element = e.currentTarget as HTMLElement
    const diff = touchStart - e.changedTouches[0].clientX

    if (diff > swipeThreshold) {
      element.style.transform = `translateX(-${deleteButtonWidth}px)`
    } else {
      element.style.transform = 'translateX(0)'
      setSwiping(null)
    }
  }

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
    toast({
      description: "商品已删除",
    })
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
      {items.map((item) => (
        <div key={item.id} className="relative overflow-hidden">
          <Card 
            className="p-3 sm:p-4 transition-transform duration-200"
            onTouchStart={(e) => handleTouchStart(e, item.id)}
            onTouchMove={(e) => handleTouchMove(e, item.id)}
            onTouchEnd={(e) => handleTouchEnd(e, item.id)}
          >
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-6">
                <Checkbox 
                  checked={item.selected}
                  onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 h-8 px-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    <span className="text-sm">删除</span>
                  </Button>

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
              </div>
            </div>
          </Card>
          <div 
            className="absolute right-0 top-0 bottom-0 bg-red-500 w-20 flex items-center justify-center text-white"
            style={{
              transform: swiping === item.id ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.2s'
            }}
            onClick={() => handleDelete(item.id)}
          >
            删除
          </div>
        </div>
      ))}
    </div>
  )
}