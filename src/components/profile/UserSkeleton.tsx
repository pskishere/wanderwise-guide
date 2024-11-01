interface UserSkeletonProps {
  count?: number
}

export const UserSkeleton = ({ count = 3 }: UserSkeletonProps) => {
  return (
    <div className="space-y-4">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-xl animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-48 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}