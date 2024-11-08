import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { mockProducts } from "@/store/mocks/productMocks"
import { ProductSearchResults } from "./ProductSearchResults"
import { SelectedProducts } from "./SelectedProducts"
import { Card } from "@/components/ui/card"
import { SimpleProduct } from "./types"

interface ProductSelectorProps {
  selectedProducts: SimpleProduct[]
  onSelectProduct: (product: SimpleProduct) => void
  onRemoveProduct: (productId: number) => void
}

export const ProductSelector = ({
  selectedProducts,
  onSelectProduct,
  onRemoveProduct
}: ProductSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)

  const filteredProducts = mockProducts
    .filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedProducts.some(p => p.id === product.id)
    )
    .map(product => ({
      id: product.id,
      title: product.title,
      price: `¥${product.price}`,
      image: product.images[0]
    }))

  const handleSelect = (product: SimpleProduct) => {
    onSelectProduct(product)
    setSearchTerm("")
    setShowResults(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Search className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500">添加推广商品</span>
      </div>

      <div className="relative">
        <Card className="relative overflow-hidden transition-shadow duration-200">
          <div className="flex items-center">
            <Input
              placeholder="搜索商品..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShowResults(true)
              }}
              onFocus={() => setShowResults(true)}
              className="flex-1 p-2 h-9 focus-visible:ring-0 placeholder:text-gray-400 text-xs"
            />
          </div>
        </Card>

        {showResults && (
          <ProductSearchResults 
            products={filteredProducts}
            onSelect={handleSelect}
          />
        )}
      </div>

      <SelectedProducts 
        products={selectedProducts}
        onRemove={onRemoveProduct}
      />
    </div>
  )
}