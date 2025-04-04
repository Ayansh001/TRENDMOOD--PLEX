
import React from 'react';
import Layout from '../components/Layout'; // ✅ Correct

import ChatInterface from '../components/ChatInterface';
import { MessageSquare } from 'lucide-react';

const ChatPage = () => {
  return (
    <Layout>
      <div className="pt-8 pb-16">
        <div className="flex items-center justify-center mb-4">
          <MessageSquare className="h-8 w-8 text-netflix-red mr-2" />
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            AI Recommendation Chat
          </h1>
        </div>
        
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
          Chat with our AI assistant to get personalized movie and TV show recommendations.
          Ask anything about movies, genres, similar titles, or based on your mood.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <ChatInterface />
        </div>
        
        <div className="mt-12 bg-netflix-darkgray rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Example Prompts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-netflix-gray rounded p-3 cursor-pointer hover:bg-netflix-gray/80 transition-colors">
              "I want a sci-fi movie like Inception but easier to understand."
            </div>
            <div className="bg-netflix-gray rounded p-3 cursor-pointer hover:bg-netflix-gray/80 transition-colors">
              "I'm in a sad mood. Recommend something uplifting."
            </div>
            <div className="bg-netflix-gray rounded p-3 cursor-pointer hover:bg-netflix-gray/80 transition-colors">
              "What are the top trending shows this week?"
            </div>
            <div className="bg-netflix-gray rounded p-3 cursor-pointer hover:bg-netflix-gray/80 transition-colors">
              "Recommend a mind-blowing thriller with great plot twists."
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
