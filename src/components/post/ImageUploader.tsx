import { Camera, X } from "lucide-react"

interface ImageUploaderProps {
  images: string[]
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: (index: number) => void
  characterCount: number
  remainingCharacters: number
  isOverLimit: boolean
}

export const ImageUploader = ({ 
  images, 
  onUpload, 
  onRemove,
  characterCount,
  remainingCharacters,
  isOverLimit
}: ImageUploaderProps) => {
  if (images.length === 0) {
    return (
      <label className="block aspect-[4/3] rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onUpload}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <Camera className="w-8 h-8 mb-2" />
          <span className="text-sm">点击上传图片</span>
          <span className="text-xs mt-1">最多9张</span>
        </div>
      </label>
    )
  }

  return (
    <div className="space-y-4">
      <div className={`grid gap-1 ${
        images.length === 1 ? 'grid-cols-1' : 
        images.length === 2 ? 'grid-cols-2' :
        'grid-cols-3'
      }`}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`relative group ${
              images.length === 1 ? 'aspect-[4/3]' : 'aspect-square'
            }`}
          >
            <img
              src={image}
              alt={`上传图片 ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
        {images.length < 9 && (
          <label className="aspect-square rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors flex flex-col items-center justify-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onUpload}
              className="hidden"
            />
            <Camera className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-500">{9 - images.length}张</span>
          </label>
        )}
      </div>

      {characterCount > 0 && (
        <div className={`text-sm text-right ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
          {remainingCharacters}
        </div>
      )}
    </div>
  )
}