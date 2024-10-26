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
              <div className="space-y-2">
                <h3 className="font-medium text-base leading-tight">{item.title}</h3>
                <div className="inline-flex">
                  <span className="text-xs px-2 py-1 bg-gray-50 rounded-sm text-gray-900">
                    {item.specs?.[0] || "默认规格"}
                  </span>
                </div>
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">
                    <span className="text-sm">¥</span>
                    <span className="text-xl font-bold">{item.price}</span>
                  </span>
                  {item.discount && (
                    <span className="text-xs text-red-500 border border-red-500 px-1.5 py-0.5 rounded-sm">
                      限时立减{item.discount}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
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

              <div className="absolute right-4 bottom-4">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-full"
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