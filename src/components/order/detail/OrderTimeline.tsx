import { Truck } from "lucide-react"
import { Card } from "@/components/ui/card"

interface TimelineEvent {
  time: string
  status: string
}

interface OrderTimelineProps {
  events: TimelineEvent[]
}

export const OrderTimeline = ({ events }: OrderTimelineProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-gray-500 mb-4">
        <Truck className="h-4 w-4" />
        <span className="text-sm">物流信息</span>
      </div>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex gap-3">
            <div className="relative flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full ${index === 0 ? "bg-pink-500" : "bg-gray-300"}`} />
              {index !== events.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200 mt-1" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <p className="text-sm text-gray-600">{event.status}</p>
              <p className="text-xs text-gray-400 mt-1">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};