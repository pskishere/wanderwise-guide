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
        <div className="px-4 py-3 border-b">
          <h3 className="font-medium">回复 @{replyTo}</h3>
        </div>
        <div className="p-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的回复..."
            className="min-h-[100px] resize-none focus-visible:ring-pink-500 bg-white/50 transition-all duration-200 ease-in-out hover:bg-white/80 focus:bg-white"
          />
        </div>
        <DrawerFooter className="px-4 py-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              取消
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="flex-1 bg-pink-500 hover:bg-pink-600 transition-all duration-200 ease-in-out hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              发送
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}