import { Navigation } from "@/components/Navigation"
import { NotificationList } from "@/components/notifications/NotificationList"
import { BottomNav } from "@/components/BottomNav"

function Notifications() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 pb-20 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">消息通知</h1>
          <span className="text-sm text-gray-500">共 3 条未读消息</span>
        </div>
        <NotificationList />
      </div>
      <BottomNav />
    </div>
  )
}

export default Notifications