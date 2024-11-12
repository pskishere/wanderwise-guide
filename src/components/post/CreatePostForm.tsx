import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ImageUploader } from "@/components/post/ImageUploader"
import { TagSelector } from "@/components/post/TagSelector"
import { MarkdownToolbar } from "@/components/post/MarkdownToolbar"
import { MapSearch } from "@/components/address/MapSearch"
import { ProductSelector } from "@/components/post/ProductSelector"
import { MapPin } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setDraft, addImage, removeImage, toggleTag } from "@/store/createPostSlice"
import dynamic from "@uiw/react-md-editor"

const MDEditor = dynamic

interface CreatePostFormProps {
  showPreview: boolean
  onTogglePreview: () => void
  onMarkdownInsert: (type: string) => void
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleLocationSelect: (address: {
    province: string
    city: string
    district: string
    detail: string
  }) => void
}

export const CreatePostForm = ({
  showPreview,
  onTogglePreview,
  onMarkdownInsert,
  handleImageUpload,
  handleLocationSelect
}: CreatePostFormProps) => {
  const dispatch = useDispatch()
  const { draft } = useSelector((state: RootState) => state.createPost)
  const suggestedTags = ["旅行", "美食", "穿搭", "护肤", "数码", "生活", "购物"]

  return (
    <div className="pt-12 pb-20">
      <div className="p-4">
        <ImageUploader 
          images={draft.images}
          onUpload={handleImageUpload}
          onRemove={(index) => dispatch(removeImage(index))}
        />
      </div>

      <div className="px-4 space-y-4">
        <Input
          placeholder="标题～"
          value={draft.title}
          onChange={(e) => dispatch(setDraft({ title: e.target.value }))}
          className="text-small border-0 px-2 py-2 focus-visible:ring-0 placeholder:text-gray-400"
          maxLength={30}
        />

        <div className="space-y-2">
          <MarkdownToolbar 
            onInsert={onMarkdownInsert}
            showPreview={showPreview}
            onTogglePreview={onTogglePreview}
          />
          {showPreview ? (
            <MDEditor.Markdown 
              source={draft.content} 
              className="min-h-[200px] p-4 rounded-lg bg-white border-2 border-gray-100 prose prose-sm max-w-none prose-p:my-2 prose-p:leading-relaxed prose-headings:font-bold prose-headings:my-3 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none hover:border-pink-100 transition-colors"
            />
          ) : (
            <Textarea
              placeholder="分享这一刻的想法..."
              value={draft.content}
              onChange={(e) => dispatch(setDraft({ content: e.target.value }))}
              className="min-h-[200px] text-base resize-none border-2 border-gray-100 p-4 focus-visible:ring-0 focus-visible:border-pink-100 placeholder:text-gray-400 rounded-lg transition-colors"
            />
          )}
        </div>

        <div className="mt-6 -mx-4">
          <div className="px-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">添加地点</span>
            </div>
            <div className="space-y-3">
              <MapSearch onAddressSelect={handleLocationSelect} />
              {draft.location && (
                <div className="inline-block px-3 py-1.5 rounded-full text-sm bg-pink-50 text-pink-500">
                  {draft.location}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 -mx-4">
          <div className="px-4">
            <ProductSelector
              selectedProducts={draft.products || []}
              onSelectProduct={(product) => 
                dispatch(setDraft({ 
                  products: [...(draft.products || []), product] 
                }))
              }
              onRemoveProduct={(productId) =>
                dispatch(setDraft({
                  products: (draft.products || []).filter(p => p.id !== productId)
                }))
              }
            />
          </div>
        </div>
      </div>

      <TagSelector 
        selectedTags={draft.tags}
        onToggleTag={(tag) => dispatch(toggleTag(tag))}
        suggestedTags={suggestedTags}
      />
    </div>
  )
}