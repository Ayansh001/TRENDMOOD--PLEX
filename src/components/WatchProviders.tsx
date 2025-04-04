
import React from 'react';
import { WatchProvider } from '../utils/trailerUtils';

interface WatchProvidersProps {
  providers: WatchProvider[];
}

const WatchProviders: React.FC<WatchProvidersProps> = ({ providers }) => {
  if (!providers.length) return null;

  return (
    <div className="mt-4 md:mt-6">
      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Where to Watch</h3>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {providers.map((provider) => (
          <div 
            key={provider.provider_id} 
            className="flex flex-col items-center bg-netflix-gray/60 rounded-md p-1.5 md:p-2 transition-transform hover:scale-105"
          >
            <img 
              src={provider.logo_path} 
              alt={provider.provider_name} 
              className="w-10 h-10 md:w-12 md:h-12 rounded-md object-contain"
              loading="lazy"
            />
            <span className="text-xs mt-1">{provider.provider_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchProviders;
