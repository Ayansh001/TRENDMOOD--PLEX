
import React, { useState, useEffect } from 'react';
import { Play, Plus, ThumbsUp, Info } from 'lucide-react';
import { Content, Movie, Series } from '../types';
import { useToast } from '@/hooks/use-toast';

interface HeroSectionProps {
  content: Content[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const { toast } = useToast();
  const activeContent = content[activeIndex];
  const isMovie = 'releaseYear' in activeContent;
  
  useEffect(() => {
    // Auto-rotate featured content every 10 seconds
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % content.length);
      setBackgroundLoaded(false);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [content.length]);
  
  const handleAddToWatchlist = () => {
    // Get existing watchlist or create new one
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    // Check if already in watchlist
    const isAlreadyInWatchlist = watchlist.some((item: Content) => item.id === activeContent.id);
    
    if (isAlreadyInWatchlist) {
      toast({
        title: "Already in watchlist",
        description: `${activeContent.title} is already in your watchlist.`,
        variant: "destructive"
      });
      return;
    }
    
    // Add to watchlist with timestamp
    const watchlistItem = {
      ...activeContent,
      addedAt: new Date().toISOString()
    };
    
    watchlist.push(watchlistItem);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    
    toast({
      title: "Added to watchlist",
      description: `${activeContent.title} has been added to your watchlist.`,
    });
  };
  
  return (
    <div className="relative h-[500px] md:h-[70vh] -mx-4 -mt-20">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${backgroundLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          backgroundImage: `url(${activeContent.backdropUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/10 to-transparent" />
      </div>
      
      {/* Preload next image */}
      <img
        src={activeContent.backdropUrl}
        alt=""
        className="hidden"
        onLoad={() => setBackgroundLoaded(true)}
      />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-20 px-8 md:px-12 lg:w-3/5">
        <div className={`transition-all duration-1000 ${backgroundLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{activeContent.title}</h1>
          
          <div className="flex items-center text-sm text-gray-300 mb-4">
            <span className="mr-4 text-netflix-red font-bold">
              {isMovie ? (activeContent as Movie).releaseYear : (activeContent as Series).firstAirDate}
            </span>
            <span className="mr-4 bg-gray-700 px-1.5 rounded text-xs">
              {isMovie ? 'MOVIE' : 'TV SERIES'}
            </span>
            <span className="mr-4">
              {isMovie 
                ? `${(activeContent as Movie).runtime} min` 
                : `${(activeContent as Series).seasons} season${(activeContent as Series).seasons !== 1 ? 's' : ''}`
              }
            </span>
            <span className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {activeContent.rating}/10
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {activeContent.genres.map((genre, index) => (
              <span key={index} className="bg-netflix-gray/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                {genre}
              </span>
            ))}
          </div>
          
          <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-none">
            {activeContent.overview}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="neon-button flex items-center">
              <Play className="h-5 w-5 mr-2" />
              Watch Trailer
            </button>
            <button onClick={handleAddToWatchlist} className="flex items-center bg-netflix-gray text-white rounded-md py-2 px-4 hover:bg-netflix-gray/80 transition-colors">
              <Plus className="h-5 w-5 mr-2" />
              Add to Watchlist
            </button>
            <button className="flex items-center bg-transparent border border-white text-white rounded-md py-2 px-4 hover:bg-white/10 transition-colors">
              <Info className="h-5 w-5 mr-2" />
              More Info
            </button>
          </div>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? 'bg-netflix-red w-8' : 'bg-gray-500'
            }`}
            aria-label={`View featured content ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
