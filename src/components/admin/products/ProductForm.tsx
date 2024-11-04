import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Product } from "@/types/product"
import { useState } from "react"

interface ProductFormProps {
  product: Partial<Product>
  onSubmit: (product: Partial<Product>) => void
  submitText?: string
}

export const ProductForm = ({ product, onSubmit, submitText = "保存" }: ProductFormProps) => {
  const [formData, setFormData] = useState(product)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">商品名称</Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="请输入商品名称"
            className="mt-1.5"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">价格</Label>
            <Input
              id="price"
              value={formData.price || ""}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="¥"
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <Label htmlFor="originalPrice">原价</Label>
            <Input
              id="originalPrice"
              value={formData.originalPrice || ""}
              onChange={(e) => handleChange("originalPrice", e.target.value)}
              placeholder="¥"
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">商品描述</Label>
          <Textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="请输入商品描述"
            className="mt-1.5"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="image">商品图片</Label>
          <Input
            id="image"
            value={formData.image || ""}
            onChange={(e) => handleChange("image", e.target.value)}
            placeholder="请输入图片URL"
            className="mt-1.5"
            required
          />
          {formData.image && (
            <img 
              src={formData.image} 
              alt="商品预览" 
              className="h-32 w-32 object-cover rounded-lg border mt-2"
            />
          )}
        </div>

        <div>
          <Label>商品分类</Label>
          <Select 
            value={formData.tags?.[0] || "clothing"}
            onValueChange={(value) => handleChange("tags", [value])}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="选择商品分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clothing">服装</SelectItem>
              <SelectItem value="accessories">配饰</SelectItem>
              <SelectItem value="shoes">鞋靴</SelectItem>
              <SelectItem value="bags">箱包</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        {submitText}
      </Button>
    </form>
  )
}