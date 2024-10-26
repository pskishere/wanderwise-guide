import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"

const relatedProducts = [
  {
    id: 2,
    title: "春季新款针织开衫",
    price: "¥399",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80"
  },
  {
    id: 3,
    title: "法式复古连衣裙",
    price: "¥599",
    image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80"
  },
  {
    id: 4,
    title: "高腰阔腿牛仔裤",
    price: "¥459",
    image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80"
  },
  {
    id: 5,
    title: "真丝印花衬衫",
    price: "¥699",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80"
  }
]

export const RelatedProducts = () => {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-6">相关推荐</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-full aspect-square object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
                <p className="text-pink-600 font-medium mt-2">{product.price}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}