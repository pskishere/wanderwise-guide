import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { ProductForm } from "./products/ProductForm"
import { ProductTable } from "./products/ProductTable"
import { ProductSearch } from "./products/ProductSearch"
import { ProductFilter } from "./products/ProductFilter"
import { ProductBulkActions } from "./products/ProductBulkActions"

interface AdminProductsProps {
  products: any[]
}

export const AdminProducts = ({ products: initialProducts }: AdminProductsProps) => {
  const { toast } = useToast()
  const [products, setProducts] = useState(initialProducts)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    stock: "",
    image: ""
  })

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setProducts(initialProducts)
      return
    }

    const filtered = initialProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setProducts(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const filtered = category === 'all' 
      ? initialProducts
      : initialProducts.filter(product => 
          product.tags.some((tag: string) => tag.includes(category))
        )
    setProducts(filtered)
  }

  const handleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(products.map(p => p.id))
    }
  }

  const handleBulkDelete = () => {
    setProducts(prev => prev.filter(product => !selectedIds.includes(product.id)))
    setSelectedIds([])
    toast({
      description: `已删除 ${selectedIds.length} 个商品`,
    })
  }

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id))
    setSelectedIds(prev => prev.filter(selectedId => selectedId !== id))
    toast({
      description: "商品已删除",
    })
  }

  const handleSaveEdit = () => {
    if (!editingProduct) return

    setProducts(prev => prev.map(product => 
      product.id === editingProduct.id ? editingProduct : product
    ))
    setEditingProduct(null)
    toast({
      description: "商品信息已更新",
    })
  }

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.price) {
      toast({
        variant: "destructive",
        description: "请填写商品名称和价格",
      })
      return
    }

    const product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: newProduct.stock ? parseInt(newProduct.stock) : null,
      tags: [selectedCategory]
    }

    setProducts(prev => [product, ...prev])
    setNewProduct({
      title: "",
      price: "",
      stock: "",
      image: ""
    })
    toast({
      description: "商品已添加",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button>添加商品</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新商品</DialogTitle>
            </DialogHeader>
            <ProductForm
              product={newProduct}
              onSubmit={handleAddProduct}
              onChange={(field, value) => setNewProduct(prev => ({
                ...prev,
                [field]: value
              }))}
              submitText="添加"
            />
          </DialogContent>
        </Dialog>

        <ProductSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>

      <ProductFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <ProductBulkActions
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onDelete={handleBulkDelete}
      />
      
      <div className="rounded-md border">
        <ProductTable
          products={products}
          selectedIds={selectedIds}
          onSelectIds={setSelectedIds}
          onEdit={handleSaveEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}