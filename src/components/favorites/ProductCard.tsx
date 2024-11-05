import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Store } from "lucide-react"

interface ProductCardProps {
  id: number
  title: string
  price: string
  image: string
  shop: string
}

export const ProductCard = ({ id, title, price, image, shop }: ProductCardProps) => {
  return (
    <Link to={`/products/${id}`}>
      <Card className="h-full overflow-hidden border-none shadow-sm hover:shadow-lg transition-shadow duration-200">
        <div className="aspect-square bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium line-clamp-2 mb-2">{title}</h3>
          <p className="text-pink-600 font-medium text-sm">{price}</p>
          <div className="flex items-center gap-1 mt-1.5">
            <Store className="h-3 w-3 text-gray-400" />
            <p className="text-xs text-gray-500">{shop}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}