import { MapPin, Utensils, BookOpen } from "lucide-react"
import { CommandGroup, CommandItem } from "@/components/ui/command"

interface Suggestion {
  id: number
  name: string
  type: string
  desc: string
}

interface SuggestionsProps {
  suggestions: {
    destinations: Suggestion[]
    foods: Suggestion[]
    guides: Suggestion[]
  }
  onSelect: (value: string) => void
}

export const SearchSuggestions = ({ suggestions, onSelect }: SuggestionsProps) => {
  return (
    <>
      <CommandGroup heading="热门目的地" className="px-2">
        {suggestions.destinations.map((item) => (
          <CommandItem 
            key={item.id}
            onSelect={() => onSelect(item.name)}
            className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50">
                <MapPin className="h-4 w-4 text-pink-500" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandGroup heading="美食推荐" className="px-2">
        {suggestions.foods.map((item) => (
          <CommandItem
            key={item.id}
            onSelect={() => onSelect(item.name)}
            className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                <Utensils className="h-4 w-4 text-orange-500" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandGroup heading="热门攻略" className="px-2">
        {suggestions.guides.map((item) => (
          <CommandItem
            key={item.id}
            onSelect={() => onSelect(item.name)}
            className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <BookOpen className="h-4 w-4 text-blue-500" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  )
}