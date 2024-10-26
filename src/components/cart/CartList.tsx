import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { CartSkeleton } from "./CartSkeleton"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  shop: string
  selected: boolean
  specs?: string
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
        <Card key={item.id} className="p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-4">
            <Checkbox 
              checked={item.selected}
              className="h-5 w-5 mt-1"
            />
            <div className="flex flex-1 gap-4">
              <div className="relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-100"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-clamp-2 leading-snug hover:text-pink-600 transition-colors cursor-pointer">
                  {item.title}
                </h3>
                {item.specs && (
                  <div className="mt-1 px-2 py-1 bg-gray-50 text-gray-500 text-xs inline-block rounded">
                    {item.specs}
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-emerald-500/10 rounded-full">
                    <span className="block w-1.5 h-1.5 bg-emerald-500 rounded-full translate-x-[3px] translate-y-[3px]" />
                  </span>
                  {item.shop}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-pink-600">
                    ¥{item.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "h-7 w-7",
                        item.quantity <= 1 && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => handleQuantityChange(item.id, 'decrease')}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleQuantityChange(item.id, 'increase')}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-red-500 -mt-1"
              onClick={() => handleDelete(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}