import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Image } from "@/components/ui/image"
import { useState } from "react"

interface ProductGalleryProps {
  images: string[]
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="space-y-4">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={1}>
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="rounded-lg object-cover w-full h-full"
                  fallback="https://placehold.co/600x600/png?text=Image+Not+Found"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative rounded-md overflow-hidden ${
              currentIndex === index ? "ring-2 ring-pink-500" : ""
            }`}
          >
            <AspectRatio ratio={1}>
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
                fallback="https://placehold.co/600x600/png?text=Image+Not+Found"
              />
            </AspectRatio>
          </button>
        ))}
      </div>
    </div>
  )
}