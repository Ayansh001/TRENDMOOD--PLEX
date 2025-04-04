
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import ContentRow from '../components/ContentRow';
import TrendingSection from '../components/TrendingSection';
import { trendingContent, movieData, seriesData, getMoodBasedRecommendations } from '../data/mockData';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  // Get top rated movies and series
  const topRatedMovies = [...movieData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 15);
  
  const topRatedSeries = [...seriesData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 15);
  
  // Get mood-based recommendations (happy as default)
  const feelGoodContent = getMoodBasedRecommendations('happy').slice(0, 15);
  
  // Get recently added content (using the first 15 items as a mock)
  const recentlyAdded = [...movieData, ...seriesData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 15);
  
  return (
    <Layout>
      <HeroSection content={[...topRatedMovies, ...topRatedSeries].slice(0, 5)} />
      
      <div className="px-0 md:px-4">
        <TrendingSection content={trendingContent} />
        
        <ContentRow 
          title="Top Rated Movies" 
          content={topRatedMovies} 
          size={isMobile ? "medium" : "medium"}
        />
        
        <ContentRow 
          title="Popular TV Series" 
          content={topRatedSeries} 
          size={isMobile ? "medium" : "medium"}
        />
        
        <ContentRow 
          title="Feel Good Picks" 
          content={feelGoodContent} 
          size={isMobile ? "medium" : "medium"}
        />
        
        <ContentRow 
          title="Recently Added" 
          content={recentlyAdded} 
          size={isMobile ? "medium" : "medium"}
        />
      </div>
      
      <div className="py-8 md:py-12 text-center px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-3">Discover More with AI Recommendations</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6 text-sm md:text-base">
          Our AI-powered recommendation system helps you find the perfect movie or show based on your mood, preferences, or specific requirements.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
          <a href="/mood" className="neon-button">
            Mood-Based Recommendations
          </a>
          <a href="/chat" className="bg-netflix-gray text-white rounded-md py-2 px-4 hover:bg-netflix-gray/80 transition-colors">
            Chat with MovieBot
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
