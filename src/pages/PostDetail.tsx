import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PostHeader } from "@/components/post/PostHeader"
import { PostContent } from "@/components/post/PostContent"
import { PostActions } from "@/components/post/PostActions"
import { CommentItem } from "@/components/CommentItem"

const post = {
  id: "1",
  title: "My Travel Story",
  content: "This is my amazing travel story...",
  author: {
    name: "John Doe",
    avatar: "/avatars/john.jpg"
  },
  likes: 42,
  comments: [
    {
      id: 1,
      author: {
        name: "Jane Smith",
        avatar: "/avatars/jane.jpg"
      },
      content: "Great story!",
      time: "2小时前",
      likes: 3,
      replies: []
    }
  ],
  tags: ["travel", "story"]
}

export default function PostDetail() {
  const [comment, setComment] = useState("")

  const handleSubmitComment = () => {
    if (!comment.trim()) return
    // TODO: Submit comment logic
    setComment("")
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <PostHeader title={post.title} />
      <PostContent 
        title={post.title}
        content={post.content}
        author={post.author}
        tags={post.tags}
      />
      <PostActions likes={post.likes} />
      
      <div className="space-y-6 mt-8">
        <h3 className="font-medium text-lg">评论 ({post.comments.length})</h3>
        {post.comments.map(comment => (
          <CommentItem 
            key={comment.id}
            comment={comment}
            onReply={(parentId, content) => {
              // TODO: Handle reply
              console.log("Reply to", parentId, content)
            }}
            onLike={(commentId) => {
              // TODO: Handle like
              console.log("Like comment", commentId)  
            }}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-6 sticky bottom-0 bg-white p-4 border-t">
        <Input
          placeholder="写下你的评论..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSubmitComment}>发送</Button>
      </div>
    </div>
  )
}