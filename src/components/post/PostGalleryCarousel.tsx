import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface PostGalleryCarouselProps {
  images: string[]
  title: string
  onImageClick: (index: number) => void
}

export const PostGalleryCarousel = ({ images, title, onImageClick }: PostGalleryCarouselProps) => {
  return (
    <div className="w-full aspect-[4/3] bg-black">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div 
                className="flex aspect-[4/3] items-center justify-center cursor-zoom-in"
                onClick={() => onImageClick(index)}
              >
                <img
                  src={image}
                  alt={`${title} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  )
}