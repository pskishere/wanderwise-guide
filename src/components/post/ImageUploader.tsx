import { Camera, X, Globe2 } from "lucide-react"

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
  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <div className={`grid gap-2 ${
          images.length === 1 ? 'grid-cols-1' : 
          images.length === 2 ? 'grid-cols-2' :
          images.length === 3 ? 'grid-cols-2' :
          'grid-cols-2'
        }`}>
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative group ${
                images.length === 3 && index === 0 ? 'row-span-2' : ''
              }`}
            >
              <img
                src={image}
                alt={`上传图片 ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl aspect-square"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {images.length < 9 && (
            <label className="p-2 hover:bg-pink-50 rounded-full cursor-pointer transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onUpload}
                className="hidden"
              />
              <Camera className="w-5 h-5 text-pink-500" />
            </label>
          )}
          <button 
            type="button" 
            className="p-2 hover:bg-pink-50 rounded-full transition-colors"
          >
            <Globe2 className="w-5 h-5 text-pink-500" />
          </button>
        </div>

        {characterCount > 0 && (
          <div className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
            {remainingCharacters}
          </div>
        )}
      </div>
    </div>
  )
}