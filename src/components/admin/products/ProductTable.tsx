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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProductForm } from "./ProductForm"
import { Product } from "@/types/product"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"

interface ProductTableProps {
  products: Product[];
  selectedIds: number[];
  onSelectIds: (ids: number[]) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductTable = ({ 
  products, 
  selectedIds,
  onSelectIds,
  onEdit, 
  onDelete 
}: ProductTableProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      onSelectIds(selectedIds.filter(selectedId => selectedId !== id))
    } else {
      onSelectIds([...selectedIds, id])
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>图片</TableHead>
          <TableHead>商品名</TableHead>
          <TableHead>价格</TableHead>
          <TableHead>销量</TableHead>
          <TableHead>分类</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Checkbox
                checked={selectedIds.includes(product.id)}
                onCheckedChange={() => handleSelect(product.id)}
              />
            </TableCell>
            <TableCell>
              <Image 
                src={product.image} 
                alt={product.title}
                className="h-12 w-12 object-cover rounded"
              />
            </TableCell>
            <TableCell>
              <div className="max-w-[200px]">
                <p className="truncate font-medium">{product.title}</p>
                <p className="text-sm text-gray-500 truncate">{product.description}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-0.5">
                <p className="font-medium text-pink-600">{product.price}</p>
                {product.originalPrice && (
                  <p className="text-sm text-gray-500 line-through">{product.originalPrice}</p>
                )}
              </div>
            </TableCell>
            <TableCell>{product.sales}</TableCell>
            <TableCell>
              {product.tags?.map(tag => (
                <Badge key={tag} variant="secondary" className="mr-1">
                  {tag}
                </Badge>
              ))}
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => setEditingProduct(product)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    编辑
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>编辑商品信息</DialogTitle>
                  </DialogHeader>
                  {editingProduct && (
                    <ProductForm
                      product={editingProduct}
                      onSubmit={(updatedProduct) => {
                        onEdit({ ...editingProduct, ...updatedProduct })
                        setEditingProduct(null)
                      }}
                    />
                  )}
                </DialogContent>
              </Dialog>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onDelete(product.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                删除
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}