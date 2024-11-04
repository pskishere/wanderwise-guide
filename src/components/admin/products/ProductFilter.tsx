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
    { id: "shoes", name: "鞋靴" },
    { id: "bags", name: "箱包" }
  ]

  return (
    <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-lg">
      <Tag className="h-4 w-4 text-gray-400" />
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