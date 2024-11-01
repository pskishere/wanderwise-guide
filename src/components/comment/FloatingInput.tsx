import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface FloatingInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  replyTo: { id: number; name: string } | null
  onCancelReply: () => void
  placeholder?: string
}

export const FloatingInput = ({
  value,
  onChange,
  onSubmit,
  replyTo,
  onCancelReply,
  placeholder = "说点什么..."
}: FloatingInputProps) => {
  const [inputHeight, setInputHeight] = useState(44)
  const [isFocused, setIsFocused] = useState(false)

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
    const textarea = e.target
    textarea.style.height = 'auto'
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 44), 120)
    setInputHeight(newHeight)
    textarea.style.height = `${newHeight}px`
  }

  return (
    <motion.div 
      initial={false}
      animate={{ 
        y: isFocused ? 0 : 10,
        opacity: isFocused ? 1 : 0.95,
        scale: isFocused ? 1 : 0.98,
      }}
      transition={{ 
        duration: 0.2,
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      }}
      className="fixed inset-x-0 bottom-0 bg-white/80 backdrop-blur-lg border-t shadow-lg"
    >
      <div className="flex gap-2 max-w-lg mx-auto p-4 pb-[calc(env(safe-area-inset-bottom,_0px)_+_1rem)]">
        <AnimatePresence mode="wait">
          {replyTo ? (
            <motion.div 
              key="reply"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex-1 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <span className="text-xs text-gray-400">回复</span>
                  @{replyTo.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCancelReply}
                  className="h-6 px-2 text-xs text-gray-500 hover:bg-gray-100/80"
                >
                  取消回复
                </Button>
              </div>
              <textarea
                value={value}
                onChange={handleTextareaChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className="w-full resize-none rounded-xl border border-gray-200/80 bg-white/80 p-3 text-sm focus:border-pink-500 focus:outline-none transition-colors"
                style={{ height: `${inputHeight}px` }}
                rows={1}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="comment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex-1"
            >
              <textarea
                value={value}
                onChange={handleTextareaChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className="w-full resize-none rounded-xl border border-gray-200/80 bg-white/80 p-3 text-sm focus:border-pink-500 focus:outline-none transition-colors"
                style={{ height: `${inputHeight}px` }}
                rows={1}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button 
          onClick={onSubmit}
          className="rounded-full bg-pink-500 hover:bg-pink-600 px-8 shrink-0 self-end transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!value.trim()}
        >
          发送
        </Button>
      </div>
    </motion.div>
  )
}