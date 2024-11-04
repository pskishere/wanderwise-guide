import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFormProps {
  product: {
    title: string
    price: string | number
    originalPrice?: string | number
    stock: string | number
    description?: string
    image: string
    tags?: string[]
  }
  onSubmit: () => void
  onChange: (field: string, value: string | string[]) => void
  submitText?: string
}

export const ProductForm = ({ product, onSubmit, onChange, submitText = "保存" }: ProductFormProps) => {
  const categories = [
    { id: "clothing", name: "服装" },
    { id: "accessories", name: "配饰" },
    { id: "shoes", name: "鞋靴" }
  ]

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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>售价</Label>
          <Input
            type="number"
            value={product.price}
            onChange={(e) => onChange("price", e.target.value)}
            placeholder="请输入售价"
          />
        </div>
        <div className="space-y-2">
          <Label>原价</Label>
          <Input
            type="number"
            value={product.originalPrice || ""}
            onChange={(e) => onChange("originalPrice", e.target.value)}
            placeholder="请输入原价"
          />
        </div>
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
        <Label>商品描述</Label>
        <Textarea
          value={product.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="请输入商品描述"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>商品分类</Label>
        <Select 
          value={product.tags?.[0] || categories[0].id}
          onValueChange={(value) => onChange("tags", [value])}
        >
          <SelectTrigger>
            <SelectValue placeholder="选择商品分类" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>商品图片</Label>
        <Input
          value={product.image}
          onChange={(e) => onChange("image", e.target.value)}
          placeholder="请输入图片链接"
        />
        {product.image && (
          <div className="mt-2">
            <img 
              src={product.image} 
              alt="商品预览" 
              className="h-32 w-32 object-cover rounded-lg border"
            />
          </div>
        )}
      </div>

      <Button 
        onClick={onSubmit}
        className="w-full"
      >
        {submitText}
      </Button>
    </div>
  )
}