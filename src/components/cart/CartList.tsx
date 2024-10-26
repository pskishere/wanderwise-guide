import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
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
}

interface CartListProps {
  items?: CartItem[]
  isLoading: boolean
  onCheckout: () => void
}

export const CartList = ({ items, isLoading, onCheckout }: CartListProps) => {
  const { toast } = useToast()

  const handleDelete = (id: number) => {
    toast({
      description: "商品已从购物车中移除",
    })
  }

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
          <div className="flex items-center gap-4">
            <Checkbox 
              checked={item.selected}
              className="h-5 w-5"
            />
            <div className="flex flex-1 gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.shop}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-pink-600">
                    ¥{item.price}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, 'decrease')}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, 'increase')}
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
              className="text-gray-400 hover:text-red-500"
              onClick={() => handleDelete(item.id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}