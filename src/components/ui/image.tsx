import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

export const Image = ({ className, src, alt, fallback, ...props }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className="relative bg-gray-200 overflow-hidden">
      {isLoading && (
        <Skeleton 
          className={cn(
            "absolute inset-0",
            className
          )} 
        />
      )}
      <img
        src={error && fallback ? fallback : src}
        alt={alt}
        className={cn(
          isLoading ? "opacity-0" : "opacity-100",
          "transition-opacity duration-300",
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
        {...props}
      />
    </div>
  )
}