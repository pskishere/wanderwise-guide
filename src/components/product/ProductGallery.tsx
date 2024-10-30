import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Image } from "@/components/ui/image"
import { ImageLightbox } from "@/components/ImageLightbox"
import { useState, useEffect } from "react"
import { useCarousel } from "@/components/ui/carousel"

interface ProductGalleryProps {
  images: string[]
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [api, setApi] = useState<any>(null)

  // 监听轮播图变化,更新当前索引
  useEffect(() => {
    if (!api) return

    api.on("select", () => {
      const selectedIndex = api.selectedScrollSnap()
      setCurrentIndex(selectedIndex)
    })
  }, [api])

  return (
    <div className="space-y-4">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={1}>
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="rounded-lg object-cover w-full h-full cursor-zoom-in"
                  fallback="https://placehold.co/600x600/png?text=Image+Not+Found"
                  onClick={() => {
                    setCurrentIndex(index)
                    setLightboxOpen(true)
                  }}
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
            onClick={() => {
              setCurrentIndex(index)
              api?.scrollTo(index)
            }}
            className={`relative rounded-md overflow-hidden transition-all duration-200 ${
              currentIndex === index 
                ? "ring-2 ring-pink-500 ring-offset-2" 
                : "opacity-70 hover:opacity-100"
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

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        index={currentIndex}
      />
    </div>
  )
}