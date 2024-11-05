import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { mockProducts } from "@/services/mockData"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  title: string
  price: string
  image: string
}

interface ProductSelectorProps {
  selectedProducts: Product[]
  onSelectProduct: (product: Product) => void
  onRemoveProduct: (productId: number) => void
}

export const ProductSelector = ({
  selectedProducts,
  onSelectProduct,
  onRemoveProduct
}: ProductSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)

  const filteredProducts = mockProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedProducts.some(p => p.id === product.id)
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Search className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500">添加推广商品</span>
      </div>

      <div className="relative">
        <Input
          placeholder="搜索商品..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setShowResults(true)
          }}
          className="w-full"
        />

        {showResults && searchTerm && (
          <Card className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto z-50 p-2 space-y-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => {
                  onSelectProduct(product)
                  setSearchTerm("")
                  setShowResults(false)
                }}
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
        )}
      </div>

      {selectedProducts.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {selectedProducts.map((product) => (
            <Card key={product.id} className="p-2">
              <div className="flex gap-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-2">{product.title}</h4>
                  <p className="text-pink-600 text-sm mt-1">{product.price}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-red-500 mt-1 h-6 px-2"
                    onClick={() => onRemoveProduct(product.id)}
                  >
                    移除
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}