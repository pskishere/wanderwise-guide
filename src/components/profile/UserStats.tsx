import { Link } from "react-router-dom"
import { StatItem } from "./StatItem"

interface UserStatsProps {
  stats: {
    posts: string
    following: string
    followers: string
  }
}

export const UserStats = ({ stats }: UserStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-6 text-center">
      <StatItem
        label="笔记"
        count={stats.posts}
        href="/profile/posts"
      />
      <StatItem
        label="关注"
        count={stats.following}
        href="/profile/social"
      />
      <StatItem
        label="粉丝"
        count={stats.followers}
        href="/profile/social"
      />
    </div>
  )
}