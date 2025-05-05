'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
}

export default function ProductCard({ id, name, price, images, slug }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Link href={`${slug}`} className="group relative block" data-product-id={id}>
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={images[currentImageIndex]}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Navigation buttons */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100 mx-2">
            <button
              onClick={handlePrevious}
              className="bg-white/60 p-1.5 rounded-full hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="bg-white/60 p-1.5 rounded-full hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
} 