
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ContentRow from '../components/ContentRow';
import { TrendingUp, Film, Tv } from 'lucide-react';
import { Content, Movie, Series } from '../types';
import { trendingContent, movieData, seriesData } from '../data/mockData';

type FilterType = 'all' | 'movies' | 'series';

const TrendingPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [filteredContent, setFilteredContent] = useState<Content[]>([]);
  
  useEffect(() => {
    // Filter content based on selection
    if (activeFilter === 'all') {
      setFilteredContent(trendingContent);
    } else if (activeFilter === 'movies') {
      setFilteredContent(trendingContent.filter(item => 'releaseYear' in item));
    } else {
      setFilteredContent(trendingContent.filter(item => 'seasons' in item));
    }
  }, [activeFilter]);
  
  // Generate popular in different genres
  const getTopByGenre = (genre: string) => {
    const moviesInGenre = movieData
      .filter(movie => movie.genres.includes(genre))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
      
    const seriesInGenre = seriesData
      .filter(series => series.genres.includes(genre))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
      
    return [...moviesInGenre, ...seriesInGenre].slice(0, 10);
  };
  
  return (
    <Layout>
      <div className="pt-8 pb-16">
        <div className="flex items-center justify-center mb-4">
          <TrendingUp className="h-8 w-8 text-netflix-red mr-2" />
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Trending Now
          </h1>
        </div>
        
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
          Discover what's hot right now. Stay updated with the most popular movies and TV shows.
        </p>
        
        <div className="flex justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full flex items-center ${
              activeFilter === 'all'
                ? 'bg-netflix-red text-white'
                : 'bg-netflix-gray hover:bg-netflix-gray/80'
            }`}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            All Trending
          </button>
          
          <button
            onClick={() => setActiveFilter('movies')}
            className={`px-4 py-2 rounded-full flex items-center ${
              activeFilter === 'movies'
                ? 'bg-netflix-red text-white'
                : 'bg-netflix-gray hover:bg-netflix-gray/80'
            }`}
          >
            <Film className="h-4 w-4 mr-2" />
            Movies
          </button>
          
          <button
            onClick={() => setActiveFilter('series')}
            className={`px-4 py-2 rounded-full flex items-center ${
              activeFilter === 'series'
                ? 'bg-netflix-red text-white'
                : 'bg-netflix-gray hover:bg-netflix-gray/80'
            }`}
          >
            <Tv className="h-4 w-4 mr-2" />
            TV Series
          </button>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">This Week's Hottest</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredContent.map((item, index) => (
              <div key={item.id} className="relative">
                <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                  {index + 1}
                </div>
                <img 
                  src={item.posterUrl} 
                  alt={item.title} 
                  className="w-full rounded-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
                />
                <p className="mt-2 font-semibold truncate">{item.title}</p>
                <p className="text-xs text-gray-400">
                  {'releaseYear' in item 
                    ? `${(item as Movie).releaseYear} • Movie` 
                    : `${(item as Series).firstAirDate} • Series`
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <ContentRow 
          title="Popular in Action" 
          content={getTopByGenre('Action')} 
        />
        
        <ContentRow 
          title="Popular in Comedy" 
          content={getTopByGenre('Comedy')} 
        />
        
        <ContentRow 
          title="Popular in Drama" 
          content={getTopByGenre('Drama')} 
        />
      </div>
    </Layout>
  );
};

export default TrendingPage;
