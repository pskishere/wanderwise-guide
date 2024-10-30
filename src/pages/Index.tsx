import { Navigation } from "@/components/Navigation"
import { TravelNotes } from "@/components/TravelNotes"
import { BottomNav } from "@/components/BottomNav"
import { SideNav } from "@/components/SideNav"

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SideNav />
      
      <div className="container mx-auto px-1 pt-20 pb-20 max-w-6xl md:ml-64">
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