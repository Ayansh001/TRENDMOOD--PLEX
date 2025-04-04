
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Content } from '../types';
import MovieCard from './MovieCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface ContentRowProps {
  title: string;
  content: Content[];
  size?: 'small' | 'medium' | 'large';
}

const ContentRow: React.FC<ContentRowProps> = ({ 
  title, 
  content,
  size = 'medium' 
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { current } = rowRef;
      const scrollAmount = direction === 'left' 
        ? -current.clientWidth / 2 
        : current.clientWidth / 2;
      
      current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  // Calculate proper card widths based on device and size
  const getCardWidth = () => {
    if (isMobile) {
      return size === 'small' ? '110px' : size === 'medium' ? '130px' : '150px';
    }
    return size === 'small' ? '160px' : size === 'medium' ? '180px' : '220px';
  };
  
  return (
    <div className="my-4 md:my-6 lg:my-8">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 px-4 md:px-0">{title}</h2>
      
      <div className="relative group">
        <div
          ref={rowRef}
          className="netflix-carousel px-4 md:px-0"
          style={{ 
            scrollSnapType: 'x mandatory'
          }}
        >
          {content.map((item) => (
            <div 
              key={item.id} 
              className="snap-start px-1 md:px-1.5"
              style={{ minWidth: getCardWidth() }}
            >
              <MovieCard
                content={item}
                size={size}
              />
            </div>
          ))}
        </div>
        
        {/* Scroll buttons - hidden on mobile */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ContentRow;
