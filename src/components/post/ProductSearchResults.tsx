import { Card } from "@/components/ui/card"

interface Product {
  id: number
  title: string
  price: string
  image: string
}

interface ProductSearchResultsProps {
  products: Product[]
  onSelect: (product: Product) => void
}

export const ProductSearchResults = ({ products, onSelect }: ProductSearchResultsProps) => {
  if (products.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        未找到相关商品
      </div>
    )
  }

  return (
    <Card className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto z-50 p-2 space-y-2 bg-white shadow-lg">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          onClick={() => onSelect(product)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-12 h-12 object-cover rounded"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium truncate">{product.title}</h4>
            <p className="text-pink-600 text-sm">{product.price}</p>
          </div>
        </div>
      ))}
    </Card>
  )
}