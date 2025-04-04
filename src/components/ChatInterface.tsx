
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Content } from '../types';
import { getRecommendationFromQuery } from '../utils/recommendationUtils';
import MovieCard from './MovieCard';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  recommendations?: Content[];
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hello! I'm your movie recommendation assistant. How can I help you find something to watch today? You can ask me for recommendations based on genre, mood, or similar to movies you've enjoyed before."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      // Get recommendations based on the input
      const recommendations = getRecommendationFromQuery(input);
      
      // Generate a response based on what was found
      let responseText = "";
      
      if (input.toLowerCase().includes('trending')) {
        responseText = "Here are some trending titles that are popular right now:";
      } else if (input.toLowerCase().includes('like') && input.toLowerCase().includes('but')) {
        responseText = "Based on your request for something similar but with different elements, here are some recommendations:";
      } else if (
        input.toLowerCase().includes('happy') || 
        input.toLowerCase().includes('sad') || 
        input.toLowerCase().includes('excit') || 
        input.toLowerCase().includes('bore') || 
        input.toLowerCase().includes('stress')
      ) {
        responseText = "Based on your mood, I think you might enjoy these:";
      } else {
        responseText = "Here are some recommendations based on your request:";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: responseText,
        recommendations
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-[600px] bg-netflix-darkgray rounded-lg shadow-lg">
      {/* Message area */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] rounded-lg p-3
                  ${message.type === 'user' 
                    ? 'bg-netflix-blue text-white' 
                    : 'bg-netflix-gray text-white'}
                `}
              >
                <div className="flex items-center mb-1">
                  {message.type === 'bot' ? (
                    <Bot className="h-4 w-4 mr-2" />
                  ) : (
                    <User className="h-4 w-4 mr-2" />
                  )}
                  <span className="text-xs font-semibold">
                    {message.type === 'user' ? 'You' : 'MovieBot'}
                  </span>
                </div>
                <p>{message.text}</p>
                
                {/* Recommendations */}
                {message.recommendations && message.recommendations.length > 0 && (
                  <div className="mt-4">
                    <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
                      {message.recommendations.map((content) => (
                        <div key={content.id} className="flex-shrink-0">
                          <MovieCard content={content} size="small" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-netflix-gray text-white rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSendMessage} className="border-t border-netflix-gray p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for a recommendation..."
            className="flex-1 bg-netflix-black border border-netflix-gray rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-netflix-red"
          />
          <button
            type="submit"
            className="bg-netflix-red text-white rounded-r-lg p-2 hover:bg-red-700 transition-colors"
            disabled={isTyping}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          <p>Try asking: "Recommend a mind-blowing sci-fi movie" or "I'm feeling stressed, what should I watch?"</p>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
