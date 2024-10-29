import { Tag } from "lucide-react"

interface TagSelectorProps {
  selectedTags: string[]
  onToggleTag: (tag: string) => void
  suggestedTags: string[]
}

export const TagSelector = ({ selectedTags, onToggleTag, suggestedTags }: TagSelectorProps) => {
  return (
    <div className="mt-6 px-4">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500">添加标签</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestedTags.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedTags.includes(tag)
                ? 'bg-pink-50 text-pink-500'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  )
}