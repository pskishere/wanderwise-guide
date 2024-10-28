import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"

interface PostContentProps {
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  tags: string[]
}

export const PostContent = ({ title, content, author, tags }: PostContentProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-10 w-10 ring-2 ring-pink-500/20">
          <img src={author.avatar} alt={author.name} className="object-cover" />
        </Avatar>
        <div>
          <h3 className="font-medium">{author.name}</h3>
          <p className="text-xs text-gray-500">2024-02-20</p>
        </div>
        <Button variant="default" size="sm" className="ml-auto">
          关注
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h1 className="text-lg font-bold mb-2">{title}</h1>
      <p className="text-gray-700 text-sm leading-relaxed mb-6">
        {content}
      </p>
    </div>
  )
}