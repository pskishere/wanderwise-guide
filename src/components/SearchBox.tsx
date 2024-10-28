import * as React from "react"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const suggestions = [
  {
    category: "热门目的地",
    items: [
      { id: 1, name: "东京" },
      { id: 2, name: "大阪" },
      { id: 3, name: "京都" },
      { id: 4, name: "北海道" },
    ]
  },
  {
    category: "美食推荐",
    items: [
      { id: 5, name: "寿司" },
      { id: 6, name: "拉面" },
      { id: 7, name: "烤肉" },
      { id: 8, name: "抹茶甜点" },
    ]
  },
  {
    category: "热门攻略",
    items: [
      { id: 9, name: "东京迪士尼攻略" },
      { id: 10, name: "京都赏樱攻略" },
      { id: 11, name: "大阪环球影城攻略" },
      { id: 12, name: "北海道滑雪攻略" },
    ]
  }
]

export function SearchBox() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  const handleSelect = (value: string) => {
    setOpen(false)
    navigate(`/explore?q=${encodeURIComponent(value)}`)
  }

  return (
    <Command
      className="relative rounded-full border shadow-sm overflow-visible"
      shouldFilter={true}
    >
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandInput 
          placeholder="搜索目的地、美食、攻略..." 
          className="flex h-9 w-full rounded-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          onFocus={() => setOpen(true)}
        />
      </div>
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border bg-popover text-popover-foreground shadow-md outline-none animate-in">
          <CommandList>
            <CommandEmpty>未找到相关结果</CommandEmpty>
            {suggestions.map((group) => (
              <CommandGroup key={group.category} heading={group.category}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={handleSelect}
                    className="cursor-pointer"
                  >
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </div>
      )}
    </Command>
  )
}