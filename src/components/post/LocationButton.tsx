import { MapPin } from "lucide-react"
import { useState } from "react"
import { LocationDrawer } from "./LocationDrawer"

interface LocationButtonProps {
  location: string | null
  onLocationSelect: (location: string) => void
}

export const LocationButton = ({ location, onLocationSelect }: LocationButtonProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-6 px-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 text-sm ${location ? 'text-gray-700' : 'text-gray-500'}`}
      >
        <MapPin className="w-4 h-4" />
        <span>{location || "添加地点"}</span>
      </button>

      <LocationDrawer 
        open={open}
        onOpenChange={setOpen}
        onSelect={onLocationSelect}
      />
    </div>
  )
}