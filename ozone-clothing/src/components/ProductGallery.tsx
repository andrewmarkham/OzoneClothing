'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`w-20 h-20 border-2 ${
              selectedImage === index ? 'border-blue-600' : 'border-gray-200'
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`Product view ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative aspect-[3/4]">
        <Image
          src={images[selectedImage]}
          alt="Product main view"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
} 