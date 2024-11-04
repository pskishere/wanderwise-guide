import { PostHeader } from "@/components/post/PostHeader"
import { PostContent } from "@/components/post/PostContent"
import { PostActions } from "@/components/post/PostActions"
import { CommentInput } from "@/components/CommentInput"

const post = {
  title: "My First Post",
  author: {
    name: "John Doe",
    avatar: "/avatars/john.jpg"
  },
  content: "This is my first post content",
  tags: ["travel", "photography"],
  likes: 10,
  commentCount: 5
}

export default function PostDetail() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <PostHeader 
        title={post.title}
        author={post.author}
      />
      <PostContent 
        title={post.title}
        content={post.content}
        author={post.author}
        tags={post.tags}
      />
      <PostActions 
        likes={post.likes}
        commentCount={post.commentCount}
      />
      <CommentInput />
    </div>
  )
}