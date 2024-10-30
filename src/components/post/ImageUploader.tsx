import { Tag } from "lucide-react"

interface ImageUploaderProps {
  images: string[]
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: (index: number) => void
}

export const ImageUploader = ({ images, onUpload, onRemove }: ImageUploaderProps) => {
  if (images.length === 0) {
    return (
      <label className="block aspect-[4/3] max-w-[240px] mx-auto rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onUpload}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center mb-1.5">
            <Tag className="w-3 h-3 text-pink-500" />
          </div>
          <span className="text-[10px] font-medium">添加图片</span>
          <span className="text-[10px] mt-0.5 text-gray-400">最多9张｜建议比例3:4</span>
        </div>
      </label>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-1 max-w-[240px] mx-auto">
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
            className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span className="text-white text-[10px]">×</span>
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
          <span className="text-lg text-gray-300">+</span>
          <span className="text-[10px] text-gray-400 mt-0.5">{9 - images.length}</span>
        </label>
      )}
    </div>
  )
}