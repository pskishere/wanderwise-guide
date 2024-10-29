import { Plus, Tag } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TagSelectorProps {
  selectedTags: string[]
  onToggleTag: (tag: string) => void
  suggestedTags: string[]
}

export const TagSelector = ({ selectedTags, onToggleTag, suggestedTags }: TagSelectorProps) => {
  const [showInput, setShowInput] = useState(false)
  const [customTag, setCustomTag] = useState("")

  const handleAddCustomTag = () => {
    if (customTag.trim()) {
      onToggleTag(customTag.trim())
      setCustomTag("")
      setShowInput(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddCustomTag()
    } else if (e.key === "Escape") {
      setShowInput(false)
      setCustomTag("")
    }
  }

  return (
    <div className="mt-6 px-4">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500">添加标签</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedTags.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            className="px-3 py-1.5 rounded-full text-sm bg-pink-50 text-pink-500"
          >
            #{tag}
          </button>
        ))}
        
        {suggestedTags
          .filter(tag => !selectedTags.includes(tag))
          .map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => onToggleTag(tag)}
              className="px-3 py-1.5 rounded-full text-sm bg-gray-50 text-gray-600 hover:bg-gray-100"
            >
              #{tag}
            </button>
          ))}

        {showInput ? (
          <div className="flex gap-2 items-center">
            <Input
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入标签名称"
              className="h-8 w-32"
              maxLength={10}
              autoFocus
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAddCustomTag}
              className="h-8 px-2 text-pink-500"
            >
              添加
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowInput(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-gray-50 text-gray-600 hover:bg-gray-100"
          >
            <Plus className="w-3 h-3" />
            <span>自定义</span>
          </button>
        )}
      </div>
    </div>
  )
}