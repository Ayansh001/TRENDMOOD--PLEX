
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Play, Star, Plus, Calendar, Clock, User, ThumbsUp, Film, Monitor } from 'lucide-react';
import { Content, Movie, Series } from '../types';
import { movieData, seriesData } from '../data/mockData';
import { reviewData } from '../data/mockData';
import { getSimilarContent } from '../utils/recommendationUtils';
import { getContentTrailers, getWatchProviders, TrailerInfo, fetchContentTrailers, fetchWatchProviders } from '../utils/trailerUtils';
import ReviewSummary from '../components/ReviewSummary';
import ContentRow from '../components/ContentRow';
import YoutubeTrailer from '../components/YoutubeTrailer';
import WatchProviders from '../components/WatchProviders';
import { useToast } from '@/hooks/use-toast';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<Content | null>(null);
  const [similarContent, setSimilarContent] = useState<Content[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [trailers, setTrailers] = useState<TrailerInfo[]>([]);
  const [watchProviders, setWatchProviders] = useState<any[]>([]);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!id) return;
    
    const numId = parseInt(id);
    setIsLoading(true);
    setShowTrailer(false);
    
    // Find content by ID
    const movie = movieData.find(m => m.id === numId);
    const series = seriesData.find(s => s.id === numId);
    
    const foundContent = movie || series;
    
    const loadContentData = async () => {
      if (foundContent) {
        setContent(foundContent);
        
        // Get similar content
        const similar = getSimilarContent(foundContent.title);
        setSimilarContent(similar);
        
        // Get reviews if available
        const contentReviews = reviewData[numId] || [];
        setReviews(contentReviews);
        
        try {
          // Try to fetch trailers from API, fall back to mock data
          let contentTrailers;
          try {
            contentTrailers = await fetchContentTrailers(numId);
          } catch (error) {
            console.log('Falling back to mock trailer data');
            contentTrailers = getContentTrailers(numId);
          }
          
          setTrailers(contentTrailers);
          if (contentTrailers.length > 0) {
            setActiveTrailer(contentTrailers[0].key);
          }
          
          // Try to fetch watch providers from API, fall back to mock data
          let providers;
          try {
            providers = await fetchWatchProviders(numId);
          } catch (error) {
            console.log('Falling back to mock provider data');
            providers = getWatchProviders(numId);
          }
          
          setWatchProviders(providers);
        } catch (error) {
          console.error('Error loading content data:', error);
          // Fallback to mock data if API calls fail
          const contentTrailers = getContentTrailers(numId);
          setTrailers(contentTrailers);
          if (contentTrailers.length > 0) {
            setActiveTrailer(contentTrailers[0].key);
          }
          
          const providers = getWatchProviders(numId);
          setWatchProviders(providers);
        }
      }
      
      setIsLoading(false);
    };
    
    loadContentData();
  }, [id]);
  
  const handleAddToWatchlist = () => {
    if (!content) return;
    
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
  
  const handleTrailerClick = () => {
    if (activeTrailer) {
      setShowTrailer(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast({
        title: "Trailer Unavailable",
        description: "Sorry, no trailer is available for this content.",
        variant: "destructive"
      });
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-netflix-red"></div>
        </div>
      </Layout>
    );
  }
  
  if (!content) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Content Not Found</h2>
          <p className="text-gray-400 mb-6">
            Sorry, we couldn't find the content you're looking for.
          </p>
          <a href="/" className="neon-button">
            Return Home
          </a>
        </div>
      </Layout>
    );
  }
  
  const isMovie = 'releaseYear' in content;
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-[450px] md:min-h-[500px] -mx-4 -mt-20 mb-6 md:mb-8">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${content.backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative pt-32 pb-8 md:pb-12 px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Poster */}
            <div className="md:w-1/4">
              <img 
                src={content.posterUrl} 
                alt={content.title} 
                className="w-full max-w-[200px] md:max-w-xs mx-auto md:mx-0 rounded-lg shadow-lg"
              />
            </div>
            
            {/* Details */}
            <div className="md:w-3/4">
              <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-2">{content.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-300 mb-4 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{content.rating}/10</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {isMovie 
                      ? (content as Movie).releaseYear 
                      : `${(content as Series).firstAirDate}${(content as Series).lastAirDate ? ` - ${(content as Series).lastAirDate}` : ''}`
                    }
                  </span>
                </div>
                
                <div className="flex items-center">
                  {isMovie ? (
                    <Film className="h-4 w-4 mr-1" />
                  ) : (
                    <Monitor className="h-4 w-4 mr-1" />
                  )}
                  <span>
                    {isMovie ? 'Movie' : 'TV Series'}
                  </span>
                </div>
                
                {isMovie && (content as Movie).runtime && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{(content as Movie).runtime} min</span>
                  </div>
                )}
                
                {!isMovie && (
                  <div className="flex items-center">
                    <span>
                      {(content as Series).seasons} season{(content as Series).seasons !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                
                {(isMovie && (content as Movie).director) || (!isMovie && (content as Series).creator) ? (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>
                      {isMovie 
                        ? `Director: ${(content as Movie).director}` 
                        : `Creator: ${(content as Series).creator}`
                      }
                    </span>
                  </div>
                ) : null}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {content.genres.map((genre, index) => (
                  <span key={index} className="bg-netflix-gray/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    {genre}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 md:mb-8 max-w-3xl">
                {content.overview}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-4 md:mb-6">
                <button 
                  onClick={handleTrailerClick} 
                  className="neon-button flex items-center"
                  disabled={!activeTrailer}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Trailer
                </button>
                
                <button 
                  onClick={handleAddToWatchlist}
                  className="flex items-center bg-netflix-gray text-white rounded-md py-2 px-4 hover:bg-netflix-gray/80 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add to Watchlist
                </button>
              </div>
              
              <WatchProviders providers={watchProviders} />
              
              {content.cast && content.cast.length > 0 && (
                <div className="mt-4 md:mt-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {content.cast.map((actor, index) => (
                      <span 
                        key={index} 
                        className="bg-netflix-darkgray px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Trailer Section */}
      {showTrailer && activeTrailer && (
        <div className="mb-8 md:mb-12 px-4 md:px-8 lg:px-12">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center">
            <Play className="h-5 w-5 text-netflix-red mr-2" />
            Official Trailer
          </h2>
          <YoutubeTrailer videoId={activeTrailer} title={content.title} />
          
          {trailers.length > 1 && (
            <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
              {trailers.map((trailer) => (
                <button
                  key={trailer.key}
                  onClick={() => setActiveTrailer(trailer.key)}
                  className={`px-3 py-1 text-xs md:text-sm rounded-full transition-colors ${
                    activeTrailer === trailer.key 
                      ? 'bg-netflix-red text-white' 
                      : 'bg-netflix-gray/40 hover:bg-netflix-gray/60'
                  }`}
                >
                  {trailer.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="mb-8 md:mb-12 px-4 md:px-8 lg:px-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
            <ThumbsUp className="h-5 w-5 text-netflix-red mr-2" />
            User Reviews
          </h2>
          
          <ReviewSummary reviews={reviews} />
        </div>
      )}
      
      {/* Similar Content */}
      {similarContent.length > 0 && (
        <div className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 px-4 md:px-8 lg:px-12">Similar Content You Might Like</h2>
          <ContentRow 
            title="" 
            content={similarContent}
            size="small"
          />
        </div>
      )}
    </Layout>
  );
};

export default DetailsPage;
