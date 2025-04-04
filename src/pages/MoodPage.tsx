
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MoodSelector from '../components/MoodSelector';
import ContentRow from '../components/ContentRow';
import { Mood, Content } from '../types';
import { getMoodBasedRecommendations } from '../data/mockData';

const MoodPage = () => {
  const [selectedMood, setSelectedMood] = useState<Mood>('happy');
  const [recommendations, setRecommendations] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      const moodRecommendations = getMoodBasedRecommendations(selectedMood);
      setRecommendations(moodRecommendations);
      setIsLoading(false);
    }, 800);
  }, [selectedMood]);
  
  const moodDescriptions: Record<Mood, string> = {
    happy: "Uplifting content that will boost your mood and bring a smile to your face.",
    sad: "Emotional stories to connect with when you're feeling down or need a good cry.",
    excited: "High-energy, thrilling content that matches your enthusiasm.",
    bored: "Engaging and captivating content that will hold your attention and spark your interest.",
    stressed: "Relaxing and lighthearted content to help you unwind and reduce stress.",
    any: "A great mix of highly-rated content across different genres."
  };
  
  return (
    <Layout>
      <div className="pt-8 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          How are you feeling today?
        </h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
          We'll recommend the perfect movies and shows based on your current mood.
        </p>
        
        <MoodSelector 
          selectedMood={selectedMood} 
          onSelectMood={setSelectedMood} 
        />
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-2">
            {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Mood Recommendations
          </h2>
          <p className="text-gray-400 mb-6">
            {moodDescriptions[selectedMood]}
          </p>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
            </div>
          ) : (
            <>
              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                  <ContentRow 
                    title="Top Picks" 
                    content={recommendations.slice(0, 10)}
                    size="medium"
                  />
                  
                  {recommendations.length > 10 && (
                    <ContentRow 
                      title="More Recommendations" 
                      content={recommendations.slice(10, 20)}
                      size="medium"
                    />
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>No recommendations found for this mood. Try another mood.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MoodPage;
