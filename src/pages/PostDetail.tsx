import { useParams } from "react-router-dom"
import { PostHeader } from "@/components/post/PostHeader"
import { PostContent } from "@/components/post/PostContent"
import { PostActions } from "@/components/post/PostActions"
import { CommentSection } from "@/components/CommentSection"
import { ReplyInput } from "@/components/ReplyInput"

export default function PostDetail() {
  const { id } = useParams()
  
  return (
    <div className="pb-20">
      <PostHeader />
      <PostContent />
      <PostActions />
      <CommentSection />
      
      {/* 底部固定回复栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="container max-w-2xl mx-auto">
          <ReplyInput replyTo="" />
        </div>
      </div>
    </div>
  )
}