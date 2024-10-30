import { Navigation } from "@/components/Navigation"
import { TravelNotes } from "@/components/TravelNotes"
import { BottomNav } from "@/components/BottomNav"
import { SideNav } from "@/components/SideNav"
import { PopularDestinations } from "@/components/PopularDestinations"

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SideNav />
      
      <div className="md:ml-64 pt-20 pb-20">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <main className="lg:col-span-3">
              <TravelNotes />
            </main>
            
            <aside className="hidden lg:block space-y-6">
              <PopularDestinations />
            </aside>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Index