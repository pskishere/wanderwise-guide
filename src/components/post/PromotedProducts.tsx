import { Link } from "react-router-dom"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { SimpleProduct } from "./types"

interface PromotedProductsProps {
  products: SimpleProduct[]
  layout: "mobile" | "desktop"
}

export const PromotedProducts = ({ products, layout }: PromotedProductsProps) => {
  if (layout === "desktop") {
    return (
      <div className="space-y-3">
        {products.map((product) => (
          <Link 
            to={`/products/${product.id}`}
            key={product.id}
            className="block group"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="flex gap-3 p-3">
                <div className="w-20 h-20 shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium line-clamp-2 group-hover:text-pink-500 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-pink-600 font-medium mt-1.5">{product.price}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-2 md:-ml-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4">
            <Link 
              to={`/products/${product.id}`}
              className="block"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-none">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
                  <p className="text-pink-600 font-medium mt-1.5">{product.price}</p>
                </div>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 md:-left-12" />
      <CarouselNext className="right-0 md:-right-12" />
    </Carousel>
  )
}