import { useParams } from "react-router-dom";
import { PostHeader } from "@/components/post/PostHeader";
import { PostContent } from "@/components/post/PostContent";
import { PostActions } from "@/components/post/PostActions";
import { CommentSection } from "@/components/CommentSection";
import { ReplyInput } from "@/components/ReplyInput";
import { posts } from "@/services/mockData";

const PostDetail = () => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id) || posts[0];

  const handleSubmitComment = (content: string) => {
    console.log("New comment:", content);
    // Here you would typically make an API call to submit the comment
  };

  return (
    <div className="pb-20 relative min-h-screen">
      <PostHeader />
      <PostContent 
        title={post.title}
        content={post.content}
        author={post.author}
        tags={post.tags}
      />
      <PostActions likes={post.likes} commentCount={post.comments.length} />
      <CommentSection comments={post.comments} commentCount={post.comments.length} />
      
      {/* Fixed comment bar at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <ReplyInput 
          onSubmit={handleSubmitComment}
          onCancel={() => {}}
          replyTo=""
        />
      </div>
    </div>
  );
};

export default PostDetail;