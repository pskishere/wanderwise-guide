import { Card } from "@/components/ui/card"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { Skeleton } from "@/components/ui/skeleton"

export const PopularDestinations = () => {
  const destinationState = useSelector((state: RootState) => state.destination)
  const { destinations = [], loading = false, error = null } = destinationState || {}

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <Skeleton className="h-6 w-24 mb-3" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h2 className="font-medium mb-3">热门目的地</h2>
      <div className="space-y-3">
        {destinations.map((destination) => (
          <Card 
            key={destination.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-24 object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-medium">{destination.name}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
