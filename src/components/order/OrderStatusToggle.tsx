import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge } from "@/components/ui/badge"

export interface OrderStatus {
  value: string
  label: string
  count: number
}

interface OrderStatusToggleProps {
  statuses: OrderStatus[]
  currentStatus: string
  onStatusChange: (value: string) => void
}

export const OrderStatusToggle = ({
  statuses,
  currentStatus,
  onStatusChange
}: OrderStatusToggleProps) => {
  return (
    <ToggleGroup 
      type="single" 
      value={currentStatus} 
      onValueChange={onStatusChange}
      className="flex overflow-x-auto pb-2 -mx-4 px-4 gap-2"
    >
      {statuses.map(({ value, label, count }) => (
        <ToggleGroupItem 
          key={value} 
          value={value}
          className="whitespace-nowrap px-4 py-2 rounded-full data-[state=on]:bg-pink-50 data-[state=on]:text-pink-500 flex items-center gap-1"
        >
          {label}
          <Badge variant="secondary" className="ml-1">
            {count}
          </Badge>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}