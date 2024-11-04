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

interface AdminProductsProps {
  products: any[]
}

export const AdminProducts = ({ products }: AdminProductsProps) => {
  return (
    <div className="rounded-md border">
      <div className="p-4">
        <Button>添加商品</Button>
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
                <Button variant="outline" size="sm" className="mr-2">
                  编辑
                </Button>
                <Button variant="destructive" size="sm">
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