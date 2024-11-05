import { Navigation } from "@/components/Navigation"
import { TravelNotes } from "@/components/TravelNotes"
import { BottomNav } from "@/components/BottomNav"

function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-1 pt-20 pb-20 max-w-6xl">
        <div className="grid grid-cols-1">
          <main>
            <TravelNotes />
          </main>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default Index