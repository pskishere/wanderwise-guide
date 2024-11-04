import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface ProductBulkActionsProps {
  selectedIds: number[]
  onSelectAll: () => void
  onDelete: () => void
}

export const ProductBulkActions = ({ selectedIds, onSelectAll, onDelete }: ProductBulkActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="select-all" onCheckedChange={onSelectAll} />
        <label htmlFor="select-all" className="text-sm text-gray-500">全选</label>
      </div>
      {selectedIds.length > 0 && (
        <Button 
          variant="destructive" 
          size="sm"
          onClick={onDelete}
        >
          删除选中 ({selectedIds.length})
        </Button>
      )}
    </div>
  )
}