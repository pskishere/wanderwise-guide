import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { mockProducts } from "@/services/mockData"
import { ProductSearchResults } from "./ProductSearchResults"
import { SelectedProducts } from "./SelectedProducts"

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

  const handleSelect = (product: Product) => {
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
        <Input
          placeholder="搜索商品..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
          className="w-full"
        />

        {showResults && searchTerm && (
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