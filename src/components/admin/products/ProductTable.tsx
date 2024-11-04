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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProductForm } from "./ProductForm"

interface Product {
  id: number
  title: string
  price: number
  stock: number | null
  image: string
}

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  return (
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
                  <ProductForm
                    product={product}
                    onSubmit={() => onEdit(product)}
                    onChange={(field, value) => {
                      product[field as keyof Product] = value as never
                    }}
                  />
                </DialogContent>
              </Dialog>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onDelete(product.id)}
              >
                删除
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}