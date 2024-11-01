import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface User {
  id: number
  name: string
  avatar: string
  bio: string
  isFollowing: boolean
}

interface UserListProps {
  users: User[]
  onAction: (userId: number) => void
  actionLabel: string
  showFollowButton?: boolean
  variant?: "default" | "outline"
}

export const UserList = ({ 
  users, 
  onAction, 
  actionLabel,
  showFollowButton = true,
  variant = "default"
}: UserListProps) => {
  return (
    <div className="space-y-4">
      {users.map(user => (
        <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <img src={user.avatar} alt={user.name} className="object-cover" />
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500 truncate">{user.bio}</p>
            </div>
            {showFollowButton && (
              <Button 
                variant={variant}
                size="sm"
                onClick={() => onAction(user.id)}
                className="flex-shrink-0"
              >
                {actionLabel}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}