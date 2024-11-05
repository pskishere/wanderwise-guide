import { Navigation } from "@/components/Navigation"
import { NotificationList } from "@/components/notifications/NotificationList"
import { BottomNav } from "@/components/BottomNav"

function Notifications() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 pb-20 max-w-2xl">
        <h1 className="text-xl font-semibold mb-4">消息通知</h1>
        <NotificationList />
      </div>
      <BottomNav />
    </div>
  )
}

export default Notifications