import { MessageItem, Message } from "./MessageItem"

interface MessageListProps {
  messages: Message[]
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  )
}