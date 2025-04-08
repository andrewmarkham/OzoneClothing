
import Carousel from './Carousel';
import ProductCard from './ProductCard';

export default function CarouselExample() {
  const products = [
    {
      id: '1',
      name: 'Classic White Tee',
      price: 29.99,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.0',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.1'
      ],
      slug: 'classic-white-tee'
    },
    {
      id: '2',
      name: 'Black Denim Jacket',
      price: 89.99,
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91a1b4c3b1b?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1591047139829-d91a1b4c3b1b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.0',
        'https://images.unsplash.com/photo-1591047139829-d91a1b4c3b1b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.1'
      ],
      slug: 'black-denim-jacket'
    },
    {
      id: '3',
      name: 'Striped Sweater',
      price: 49.99,
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.0',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.1'
      ],
      slug: 'striped-sweater'
    },
    {
      id: '4',
      name: 'Cargo Pants',
      price: 59.99,
      images: [
        'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.0',
        'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.1'
      ],
      slug: 'cargo-pants'
    },
    {
      id: '5',
      name: 'Canvas Sneakers',
      price: 69.99,
      images: [
        'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.0',
        'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.1'
      ],
      slug: 'canvas-sneakers'
    }
  ];

  return (
    <div className="w-full p-8">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
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