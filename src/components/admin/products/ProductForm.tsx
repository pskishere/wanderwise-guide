import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProductFormProps {
  product: {
    title: string
    price: string | number
    stock: string | number
    image: string
  }
  onSubmit: () => void
  onChange: (field: string, value: string) => void
  submitText?: string
}

export const ProductForm = ({ product, onSubmit, onChange, submitText = "保存" }: ProductFormProps) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>商品名称</Label>
        <Input
          value={product.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="请输入商品名称"
        />
      </div>
      <div className="space-y-2">
        <Label>价格</Label>
        <Input
          type="number"
          value={product.price}
          onChange={(e) => onChange("price", e.target.value)}
          placeholder="请输入价格"
        />
      </div>
      <div className="space-y-2">
        <Label>库存</Label>
        <Input
          type="number"
          value={product.stock}
          onChange={(e) => onChange("stock", e.target.value)}
          placeholder="请输入库存数量"
        />
      </div>
      <div className="space-y-2">
        <Label>图片URL</Label>
        <Input
          value={product.image}
          onChange={(e) => onChange("image", e.target.value)}
          placeholder="请输入图片链接"
        />
      </div>
      <Button onClick={onSubmit}>{submitText}</Button>
    </div>
  )
}