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

interface AdminProductsProps {
  products: any[]
}

export const AdminProducts = ({ products: initialProducts }: AdminProductsProps) => {
  const { toast } = useToast()
  const [products, setProducts] = useState(initialProducts)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    stock: "",
    image: ""
  })

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id))
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
      stock: newProduct.stock ? parseInt(newProduct.stock) : null
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
    <div className="rounded-md border">
      <div className="p-4">
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
      </div>
      
      <ProductTable
        products={products}
        onEdit={handleSaveEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}