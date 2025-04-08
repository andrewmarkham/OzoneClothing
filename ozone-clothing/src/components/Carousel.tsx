'use client'
import { useState, useEffect, useRef } from 'react';

interface CarouselProps {
  children: React.ReactNode[];
}

export default function Carousel({ children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Duplicate the items to create a continuous loop effect
  const items = [...children, ...children];

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          // When we reach the end of the original items, reset without animation
          if (nextIndex >= children.length) {
            setTimeout(() => {
              setCurrentIndex(0);
              setIsTransitioning(false);
            }, 50);
            return nextIndex;
          }
          return nextIndex;
        });
      }, 10000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [children.length, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className="relative w-full overflow-hidden" 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 20}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
        }}
      >
        {items.map((child, index) => (
          <div
            key={index}
            className="w-[20%] flex-shrink-0"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
} 