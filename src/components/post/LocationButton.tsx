import { MapPin } from "lucide-react"

export const LocationButton = () => {
  return (
    <div className="mt-6 px-4">
      <button
        type="button"
        className="flex items-center gap-2 text-sm text-gray-500"
      >
        <MapPin className="w-4 h-4" />
        <span>添加地点</span>
      </button>
    </div>
  )
}