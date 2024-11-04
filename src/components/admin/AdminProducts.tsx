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
import { mockProducts, Product } from "@/services/mockProducts"

export const AdminProducts = () => {
  const { toast } = useToast()
  const [products, setProducts] = useState(mockProducts)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "",
    price: 0,
    stock: 0,
    description: "",
    image: "",
    tags: []
  })

  const handleSearch = () => {
    if (!searchTerm.trim() && categoryFilter === "all") {
      setProducts(mockProducts)
      return
    }

    const filtered = mockProducts.filter(product => {
      const matchesSearch = !searchTerm.trim() || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = categoryFilter === "all" || 
        product.tags.includes(categoryFilter)

      return matchesSearch && matchesCategory
    })
    setProducts(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category)
    const filtered = category === 'all' 
      ? mockProducts
      : mockProducts.filter(product => 
          product.tags.some(tag => tag.includes(category))
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

  const handleEdit = (editedProduct: Product) => {
    setProducts(prev => prev.map(product => 
      product.id === editedProduct.id ? editedProduct : product
    ))
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
      tags: newProduct.tags?.length ? newProduct.tags : [categoryFilter]
    } as Product

    setProducts(prev => [product, ...prev])
    setNewProduct({
      title: "",
      price: 0,
      stock: 0,
      description: "",
      image: "",
      tags: []
    })
    toast({
      description: "商品已添加",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">商品管理</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>添加商品</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
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
      </div>

      <div className="flex items-center justify-between gap-4">
        <ProductSearch
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategoryFilter}
          onSearch={handleSearch}
        />
      </div>

      <ProductFilter
        selectedCategory={categoryFilter}
        onCategoryChange={handleCategoryChange}
      />

      <ProductBulkActions
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onDelete={handleBulkDelete}
      />
      
      <div className="rounded-md border bg-white shadow-sm">
        <ProductTable
          products={products}
          selectedIds={selectedIds}
          onSelectIds={setSelectedIds}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}