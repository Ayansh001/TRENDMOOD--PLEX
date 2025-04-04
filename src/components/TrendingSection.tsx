
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Content } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';

interface TrendingSectionProps {
  content: Content[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ content }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-6 md:py-8">
      <div className="flex items-center mb-4 md:mb-6 px-4 md:px-0">
        <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-netflix-red mr-2" />
        <h2 className="text-xl md:text-2xl font-bold">Trending This Week</h2>
      </div>
      
      <div className="relative overflow-hidden">
        <div className="animate-carousel flex">
          {/* First set of slides */}
          {content.map((item, index) => (
            <div key={`original-${index}`} className={`${isMobile ? 'min-w-[200px]' : 'min-w-[250px]'} h-28 md:h-36 p-2`}>
              <div 
                className="w-full h-full rounded-lg bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${item.backdropUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 w-full p-3">
                  <p className="font-bold text-white text-sm md:text-base">{item.title}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {item.genres.slice(0, isMobile ? 1 : 2).map((genre, genreIndex) => (
                        <span key={genreIndex} className="text-xs text-gray-300 mr-2">
                          {genre}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-netflix-red font-semibold">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Duplicate for infinite scroll */}
          {content.map((item, index) => (
            <div key={`duplicate-${index}`} className={`${isMobile ? 'min-w-[200px]' : 'min-w-[250px]'} h-28 md:h-36 p-2`}>
              <div 
                className="w-full h-full rounded-lg bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${item.backdropUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 w-full p-3">
                  <p className="font-bold text-white text-sm md:text-base">{item.title}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {item.genres.slice(0, isMobile ? 1 : 2).map((genre, genreIndex) => (
                        <span key={genreIndex} className="text-xs text-gray-300 mr-2">
                          {genre}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-netflix-red font-semibold">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
