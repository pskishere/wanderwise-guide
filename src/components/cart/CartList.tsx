import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { CartSkeleton } from "./CartSkeleton"
import { useToast } from "@/hooks/use-toast"

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

  const handleQuantityChange = (id: number, type: 'increase' | 'decrease') => {
    toast({
      description: type === 'increase' ? "商品数量已增加" : "商品数量已减少",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(2).fill(0).map((_, i) => (
          <CartSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items?.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <h3 className="font-medium line-clamp-2 text-base">{item.title}</h3>
                  <div className="inline-flex gap-2">
                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded">
                      {item.specs?.[0] || "默认规格"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">¥{item.price}</span>
                    {item.discount && (
                      <span className="text-xs text-red-500 border border-red-500 px-1 rounded">
                        限时立减{item.discount}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-500 border border-gray-200 px-1 rounded">
                      退货包运费
                    </span>
                    <span className="text-xs text-gray-500 border border-gray-200 px-1 rounded">
                      7天无理由退货
                    </span>
                  </div>
                  {item.deadline && (
                    <div className="text-xs text-red-500">
                      截止时间 {item.deadline}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleQuantityChange(item.id, 'increase')}
                  >
                    <Plus className="h-4 w-4" />
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