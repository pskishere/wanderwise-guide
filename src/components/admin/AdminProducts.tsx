import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Image } from "@/components/ui/image"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

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
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>商品名称</Label>
                <Input
                  value={newProduct.title}
                  onChange={(e) => setNewProduct(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>价格</Label>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct(prev => ({
                    ...prev,
                    price: e.target.value
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>库存</Label>
                <Input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct(prev => ({
                    ...prev,
                    stock: e.target.value
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>图片URL</Label>
                <Input
                  value={newProduct.image}
                  onChange={(e) => setNewProduct(prev => ({
                    ...prev,
                    image: e.target.value
                  }))}
                />
              </div>
              <Button onClick={handleAddProduct}>添加</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>图片</TableHead>
            <TableHead>商品名</TableHead>
            <TableHead>价格</TableHead>
            <TableHead>库存</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image 
                  src={product.image} 
                  alt={product.title}
                  className="h-12 w-12 object-cover rounded"
                />
              </TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>¥{product.price}</TableCell>
              <TableCell>{product.stock || "不限"}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mr-2">
                      编辑
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>编辑商品信息</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>商品名称</Label>
                        <Input
                          value={editingProduct?.title || product.title}
                          onChange={(e) => setEditingProduct({
                            ...product,
                            title: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>价格</Label>
                        <Input
                          type="number"
                          value={editingProduct?.price || product.price}
                          onChange={(e) => setEditingProduct({
                            ...product,
                            price: parseFloat(e.target.value)
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>库存</Label>
                        <Input
                          type="number"
                          value={editingProduct?.stock || product.stock}
                          onChange={(e) => setEditingProduct({
                            ...product,
                            stock: parseInt(e.target.value)
                          })}
                        />
                      </div>
                      <Button onClick={handleSaveEdit}>保存</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  删除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}