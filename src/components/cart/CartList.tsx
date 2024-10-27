import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { CartSkeleton } from "./CartSkeleton"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  shop: string
  selected: boolean
  specs?: string[]
  discount?: number
  deadline?: string
}

interface CartListProps {
  items?: CartItem[]
  isLoading: boolean
  onCheckout: () => void
}

export const CartList = ({ items, isLoading }: CartListProps) => {
  const { toast } = useToast()
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [selectedItems, setSelectedItems] = useState<Record<number, boolean>>({})

  const handleQuantityChange = (id: number, type: 'increase' | 'decrease' | 'input', value?: number) => {
    let newQuantity: number
    
    if (type === 'input' && value !== undefined) {
      newQuantity = Math.max(1, Math.min(99, value))
    } else {
      const currentQuantity = quantities[id] || 1
      newQuantity = type === 'increase' ? currentQuantity + 1 : currentQuantity - 1
    }

    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantities(prev => ({ ...prev, [id]: newQuantity }))
      toast({
        description: type === 'increase' ? "商品数量已增加" : "商品数量已减少",
      })
    }
  }

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setSelectedItems(prev => ({ ...prev, [id]: checked }))
  }

  const handleDelete = (id: number) => {
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
      {items?.map((item) => (
        <Card key={item.id} className="p-3 sm:p-4">
          <div className="flex gap-3">
            <div className="flex items-center">
              <Checkbox 
                checked={selectedItems[item.id] || false}
                onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                className="ml-0.5 mr-2"
              />
            </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
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
                    disabled={quantities[item.id] <= 1}
                  >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantities[item.id] || item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, 'input', parseInt(e.target.value))}
                    className="w-10 h-7 sm:h-8 text-center p-0 text-sm"
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
      ))}
    </div>
  )
}