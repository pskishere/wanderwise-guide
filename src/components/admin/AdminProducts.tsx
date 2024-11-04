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
import { Product } from "@/types/product"
import { mockProducts } from "@/services/mockProducts"

export const AdminProducts = () => {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>(mockProducts.map(p => {
    // Convert price to number, remove ¥ if present, then calculate
    const basePrice = typeof p.price === 'string' ? 
      Number(p.price.replace('¥', '')) : 
      p.price

    return {
      id: p.id,
      title: p.title,
      price: `¥${basePrice}`,
      originalPrice: `¥${Math.round(basePrice * 1.2)}`,
      description: p.description || "",
      image: p.image,
      images: [p.image],
      tags: p.tags,
      sales: "0",
      shop: {
        name: "默认店铺",
        avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=shop"
      },
      specs: []
    }
  }))
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "",
    price: "¥0",
    originalPrice: "¥0",
    description: "",
    image: "",
    images: [],
    tags: [],
    sales: "0",
    shop: {
      name: "",
      avatar: ""
    },
    specs: []
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
      price: "¥0",
      originalPrice: "¥0",
      description: "",
      image: "",
      images: [],
      tags: [],
      sales: "0",
      shop: {
        name: "",
        avatar: ""
      },
      specs: []
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
            <Button size="lg" className="gap-2 px-8">
              添加商品
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>添加新商品</DialogTitle>
            </DialogHeader>
            <ProductForm
              product={newProduct}
              onSubmit={handleAddProduct}
              submitText="添加"
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <ProductSearch
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategoryFilter}
          onSearch={handleSearch}
        />

        <ProductFilter
          selectedCategory={categoryFilter}
          onCategoryChange={handleCategoryChange}
        />

        <ProductBulkActions
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onDelete={handleBulkDelete}
        />
        
        <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
          <ProductTable
            products={products}
            selectedIds={selectedIds}
            onSelectIds={setSelectedIds}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}
