import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface ReplyDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (content: string) => void
  replyTo: string
}

export const ReplyDrawer = ({ isOpen, onClose, onSubmit, replyTo }: ReplyDrawerProps) => {
  const [content, setContent] = useState("")

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
      setContent("")
      onClose()
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">回复</span>
            <span className="text-pink-500">@{replyTo}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-7 px-2 hover:bg-gray-100"
          >
            取消
          </Button>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="写下你的回复..."
              className="min-h-[120px] resize-none focus-visible:ring-pink-500 bg-white/50 transition-all duration-200 ease-in-out hover:bg-white/80 focus:bg-white pr-[90px]"
            />
            <Button
              onClick={handleSubmit}
              disabled={!content.trim()}
              size="sm"
              className="absolute right-2 bottom-2 bg-pink-500 hover:bg-pink-600 transition-all duration-200 ease-in-out hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              发送
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}