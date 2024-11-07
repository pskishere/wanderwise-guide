interface PostActionsProps {
  likes: number
  commentCount: number
  onLike: () => void
  onFavorite: () => void
}

export const PostActions = ({ likes, commentCount, onLike, onFavorite }: PostActionsProps) => {
  return (
    <div className="flex items-center justify-around py-3 border-t">
      <button 
        onClick={onLike}
        className="flex items-center gap-1 text-gray-500 hover:text-pink-500"
      >
        <span>点赞 {likes}</span>
      </button>
      <button className="flex items-center gap-1 text-gray-500">
        <span>评论 {commentCount}</span>
      </button>
      <button 
        onClick={onFavorite}
        className="flex items-center gap-1 text-gray-500 hover:text-pink-500"
      >
        <span>收藏</span>
      </button>
      <button className="flex items-center gap-1 text-gray-500">
        <span>分享</span>
      </button>
    </div>
  )
}