import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface Product {
  id: number
  title: string
  price: string
  image: string
}

interface SelectedProductsProps {
  products: Product[]
  onRemove: (productId: number) => void
}

export const SelectedProducts = ({ products, onRemove }: SelectedProductsProps) => {
  if (products.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {products.map((product) => (
        <Card key={product.id} className="p-2 group relative">
          <div className="flex gap-2">
            <img
              src={product.image}
              alt={product.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium line-clamp-2">{product.title}</h4>
              <p className="text-pink-600 text-sm mt-1">{product.price}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onRemove(product.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Card>
      ))}
    </div>
  )
}