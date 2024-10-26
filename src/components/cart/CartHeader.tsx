import { Checkbox } from "@/components/ui/checkbox"

interface CartHeaderProps {
  onSelectAll: (checked: boolean) => void
  isAllSelected: boolean
}

export const CartHeader = ({ onSelectAll, isAllSelected }: CartHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
        购物车
      </h1>
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
        <Checkbox 
          id="select-all"
          checked={isAllSelected}
          onCheckedChange={onSelectAll}
          className="h-4 w-4"
        />
        <label htmlFor="select-all" className="text-sm text-gray-500">
          全选
        </label>
      </div>
    </div>
  )
}