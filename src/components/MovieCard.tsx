
import React from 'react';
import { Star, Clock, Calendar, Plus } from 'lucide-react';
import { Content, Movie, Series } from '../types';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface MovieCardProps {
  content: Content;
  size?: 'small' | 'medium' | 'large';
}

const MovieCard: React.FC<MovieCardProps> = ({ content, size = 'medium' }) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const isMovie = 'releaseYear' in content;
  
  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get existing watchlist or create new one
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    // Check if already in watchlist
    const isAlreadyInWatchlist = watchlist.some((item: Content) => item.id === content.id);
    
    if (isAlreadyInWatchlist) {
      toast({
        title: "Already in watchlist",
        description: `${content.title} is already in your watchlist.`,
        variant: "destructive"
      });
      return;
    }
    
    // Add to watchlist with timestamp
    const watchlistItem = {
      ...content,
      addedAt: new Date().toISOString()
    };
    
    watchlist.push(watchlistItem);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    
    toast({
      title: "Added to watchlist",
      description: `${content.title} has been added to your watchlist.`,
    });
  };
  
  // Determine card and image sizes based on device type and size prop
  let imageHeight = isMobile 
    ? size === 'small' ? 'h-44' : size === 'medium' ? 'h-52' : 'h-64' 
    : size === 'small' ? 'h-52' : size === 'medium' ? 'h-64' : 'h-80';
    
  let cardWidth = isMobile
    ? 'w-full'
    : size === 'small' ? 'w-36' : size === 'medium' ? 'w-48' : 'w-60';
  
  return (
    <Link to={`/details/${content.id}`} className={`movie-card ${cardWidth}`}>
      <div className="relative">
        <div className="aspect-[2/3] overflow-hidden rounded-md">
          <img 
            src={content.posterUrl} 
            alt={content.title} 
            className={`w-full h-full object-cover`}
            loading="lazy"
          />
        </div>
        <button 
          onClick={handleAddToWatchlist}
          className="absolute top-2 right-2 p-1.5 bg-netflix-black/70 rounded-full hover:bg-netflix-red transition-colors"
          aria-label="Add to watchlist"
        >
          <Plus className="h-4 w-4" />
        </button>
        <div className="movie-info">
          <h3 className="text-white font-bold truncate text-sm md:text-base">{content.title}</h3>
          <div className="flex items-center text-xs mt-1 text-gray-300">
            <Star className="h-3 w-3 text-yellow-400 mr-1" />
            <span className="mr-2">{content.rating}</span>
            <Calendar className="h-3 w-3 mr-1" />
            <span className="mr-2">{isMovie ? (content as Movie).releaseYear : (content as Series).firstAirDate}</span>
            {!isMobile && isMovie && (content as Movie).runtime && (
              <>
                <Clock className="h-3 w-3 mr-1" />
                <span>{(content as Movie).runtime} min</span>
              </>
            )}
            {!isMobile && !isMovie && (
              <span>{(content as Series).seasons} seasons</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {content.genres.slice(0, isMobile ? 1 : 2).map((genre, index) => (
              <span key={index} className="text-xs bg-netflix-gray px-1.5 py-0.5 rounded">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
