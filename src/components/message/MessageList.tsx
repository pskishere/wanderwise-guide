import { MessageItem, Message } from "./MessageItem"

interface MessageListProps {
  messages: Message[]
  onMessageClick: (messageId: number) => void
}

export const MessageList = ({ messages, onMessageClick }: MessageListProps) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem 
          key={message.id} 
          message={message} 
          onClick={() => onMessageClick(message.id)}
        />
      ))}
    </div>
  )
}