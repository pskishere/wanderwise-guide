import { Tag } from "lucide-react"

interface ImageUploaderProps {
  images: string[]
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: (index: number) => void
}

export const ImageUploader = ({ images, onUpload, onRemove }: ImageUploaderProps) => {
  if (images.length === 0) {
    return (
      <label className="block aspect-[4/3] w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onUpload}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center mb-2">
            <Tag className="w-3 h-3 text-pink-500" />
          </div>
          <span className="text-xs font-medium">添加图片</span>
          <span className="text-xs mt-1 text-gray-400">最多9张｜建议比例3:4</span>
        </div>
      </label>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-1 w-full">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-square group">
          <img
            src={image}
            alt={`上传图片 ${index + 1}`}
            className="w-full h-full object-cover rounded-sm"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span className="text-white text-xs">×</span>
          </button>
        </div>
      ))}
      {images.length < 9 && (
        <label className="aspect-square border border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center cursor-pointer bg-gray-50">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onUpload}
            className="hidden"
          />
          <span className="text-xl text-gray-300">+</span>
          <span className="text-xs text-gray-400 mt-1">{9 - images.length}</span>
        </label>
      )}
    </div>
  )
}