
import Carousel from './Carousel';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
}

interface ProductCarouselProps {
  heading: string;
  products: Product[];
}

export default function ProductCarousel({ heading, products }: ProductCarouselProps) {
  return (
    <div className="w-full p-8">
      <h2 className="text-2xl font-bold mb-6">{heading}</h2>
      <Carousel>
        {products.map((product) => (
          <div key={product.id} className="px-1">
            <ProductCard {...product} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
