import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Image } from "@/components/ui/image"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface SpecsDrawerProps {
  isOpen: boolean
  onClose: () => void
  product: {
    title: string
    price: string
    image: string
    specs: Array<{
      name: string
      options: string[]
    }>
  }
}

export const SpecsDrawer = ({ isOpen, onClose, product }: SpecsDrawerProps) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => Math.min(prev + 1, 99))
    } else {
      setQuantity(prev => Math.max(prev - 1, 1))
    }
  }

  const handleSpecSelect = (name: string, value: string) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddToCart = () => {
    const isAllSpecsSelected = (product.specs || []).every(spec => 
      selectedSpecs[spec.name]
    )

    if (!isAllSpecsSelected) {
      toast({
        description: "请选择完整规格",
        variant: "destructive"
      })
      return
    }

    toast({
      description: "已添加到购物车"
    })
    onClose()
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="max-w-xl mx-auto w-full">
          <DrawerHeader className="pb-2">
            <div className="flex gap-3 -mt-2">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  fallback="https://placehold.co/600x600/png?text=商品图片"
                />
              </div>
              <div className="flex-1 min-w-0 text-left space-y-2">
                <DrawerTitle className="text-base font-medium leading-tight line-clamp-2">
                  {product.title}
                </DrawerTitle>
                <div>
                  <span className="text-pink-600 font-medium text-lg">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          </DrawerHeader>

          <div className="px-4 pb-6 space-y-6">
            {(product.specs || []).map((spec) => (
              <div key={spec.name}>
                <h3 className="text-sm text-gray-500 mb-3">{spec.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {spec.options.map((option) => (
                    <Button
                      key={option}
                      variant={selectedSpecs[spec.name] === option ? "default" : "outline"}
                      className={`h-9 px-5 text-sm rounded-full transition-all duration-200 ${
                        selectedSpecs[spec.name] === option 
                          ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-sm'
                          : 'hover:border-pink-500 hover:text-pink-500'
                      }`}
                      onClick={() => handleSpecSelect(spec.name, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h3 className="text-sm text-gray-500 mb-3">数量</h3>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border hover:border-pink-500 hover:text-pink-500 transition-colors"
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-base font-medium w-6 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border hover:border-pink-500 hover:text-pink-500 transition-colors"
                  onClick={() => handleQuantityChange('increase')}
                  disabled={quantity >= 99}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button 
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium h-11 shadow-sm"
              onClick={handleAddToCart}
            >
              确定
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}