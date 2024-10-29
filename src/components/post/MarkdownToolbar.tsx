import { Bold, Italic, List, Link } from "lucide-react"

interface MarkdownToolbarProps {
  onInsert: (type: string) => void
  showPreview: boolean
  onTogglePreview: () => void
}

export const MarkdownToolbar = ({ onInsert, showPreview, onTogglePreview }: MarkdownToolbarProps) => {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onInsert('bold')}
        className="p-1.5 hover:bg-pink-50 rounded transition-colors"
      >
        <Bold className="w-4 h-4 text-pink-600" />
      </button>
      <button
        type="button"
        onClick={() => onInsert('italic')}
        className="p-1.5 hover:bg-pink-50 rounded transition-colors"
      >
        <Italic className="w-4 h-4 text-pink-600" />
      </button>
      <button
        type="button"
        onClick={() => onInsert('list')}
        className="p-1.5 hover:bg-pink-50 rounded transition-colors"
      >
        <List className="w-4 h-4 text-pink-600" />
      </button>
      <button
        type="button"
        onClick={() => onInsert('link')}
        className="p-1.5 hover:bg-pink-50 rounded transition-colors"
      >
        <Link className="w-4 h-4 text-pink-600" />
      </button>
      <div className="flex-1" />
      <button
        type="button"
        onClick={onTogglePreview}
        className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
          showPreview ? 'bg-pink-50 text-pink-600' : 'hover:bg-gray-100 text-gray-600'
        }`}
      >
        预览
      </button>
    </div>
  )
}