import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

interface ProductCardProps {
  product: {
    id: number
    title: string
    price: string
    image: string
  }
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate()
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="p-4 flex gap-4">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="font-medium line-clamp-2">{product.title}</h3>
          <p className="text-lg font-medium text-pink-500">{product.price}</p>
        </div>
      </div>
    </Card>
  )
}