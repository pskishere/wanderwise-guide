import { Button } from "@/components/ui/button"
import { Tag } from "lucide-react"

interface ProductFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export const ProductFilter = ({ selectedCategory, onCategoryChange }: ProductFilterProps) => {
  const categories = [
    { id: "all", name: "全部" },
    { id: "clothing", name: "服装" },
    { id: "accessories", name: "配饰" },
    { id: "shoes", name: "鞋靴" }
  ]

  return (
    <div className="flex items-center gap-2">
      <Tag className="h-4 w-4 text-gray-500" />
      <div className="flex gap-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}