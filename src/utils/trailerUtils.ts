
// Mock data for trailers - in a real app, this would connect to a real API
export interface TrailerInfo {
  key: string;
  site: 'YouTube' | 'Vimeo';
  name: string;
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette';
}

export interface WatchProvider {
  provider_name: string;
  logo_path: string;
  provider_id: number;
}

// Function to fetch trailer data from TMDB API
export const fetchContentTrailers = async (contentId: number): Promise<TrailerInfo[]> => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${contentId}/videos?api_key=${process.env.TMDB_API_KEY || 'YOUR_API_KEY'}`);
    if (!response.ok) throw new Error('Failed to fetch trailers');
    
    const data = await response.json();
    return data.results.map((item: any) => ({
      key: item.key,
      site: item.site,
      name: item.name,
      type: item.type
    }));
  } catch (error) {
    console.error('Error fetching trailers:', error);
    return getContentTrailers(contentId); // Fallback to mock data
  }
};

// Mock function to get trailer for a content based on title
export const getContentTrailers = (contentId: number): TrailerInfo[] => {
  // This is mock data - in a real app, you would fetch from an API
  const mockTrailers: Record<number, TrailerInfo[]> = {
    1: [
      { 
        key: "rk-dF1lIbIg", 
        site: "YouTube", 
        name: "Official Trailer", 
        type: "Trailer" 
      },
      { 
        key: "TcMBFSGVi1c", 
        site: "YouTube", 
        name: "Teaser", 
        type: "Teaser" 
      }
    ],
    2: [
      { 
        key: "8g18jFHCLXk", 
        site: "YouTube", 
        name: "Official Trailer", 
        type: "Trailer" 
      },
      { 
        key: "6vVkULLflmE", 
        site: "YouTube", 
        name: "Teaser Trailer", 
        type: "Teaser" 
      }
    ],
    3: [
      { 
        key: "UaVTIH8mujA", 
        site: "YouTube", 
        name: "Official Trailer", 
        type: "Trailer" 
      },
      { 
        key: "VyHV0BRtdxo", 
        site: "YouTube", 
        name: "Featurette", 
        type: "Featurette" 
      }
    ],
    4: [
      { 
        key: "5PSNL1qE6VY", 
        site: "YouTube", 
        name: "Official Trailer", 
        type: "Trailer" 
      }
    ],
    5: [
      { 
        key: "sY1S34973zA", 
        site: "YouTube", 
        name: "Official Trailer", 
        type: "Trailer" 
      },
      { 
        key: "rb3FDB7HdC4", 
        site: "YouTube", 
        name: "Behind the Scenes", 
        type: "Featurette" 
      }
    ],
    // Add more mock data for remaining content IDs
    6: [{ key: "N_gD9-Oa0fg", site: "YouTube", name: "Official Trailer", type: "Trailer" }],
    7: [{ key: "dJTU48_yghs", site: "YouTube", name: "Official Trailer", type: "Trailer" }],
    8: [{ key: "giXco2jaZ_4", site: "YouTube", name: "Official Trailer", type: "Trailer" }],
    9: [{ key: "oZ6iiRrz1SY", site: "YouTube", name: "Official Trailer", type: "Trailer" }],
    10: [{ key: "0WWzgGyAH6Y", site: "YouTube", name: "Official Trailer", type: "Trailer" }]
  };
  
  return mockTrailers[contentId] || [];
};

// Function to fetch watch providers from TMDB API
export const fetchWatchProviders = async (contentId: number): Promise<WatchProvider[]> => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${contentId}/watch/providers?api_key=${process.env.TMDB_API_KEY || 'YOUR_API_KEY'}`);
    if (!response.ok) throw new Error('Failed to fetch watch providers');
    
    const data = await response.json();
    // TMDB returns providers by region, we'll use US or fallback to first available
    const results = data.results || {};
    const regionData = results.US || results[Object.keys(results)[0]] || {};
    
    // Combine flatrate, rent and buy options
    const allProviders = [
      ...(regionData.flatrate || []),
      ...(regionData.rent || []),
      ...(regionData.buy || [])
    ];
    
    // Remove duplicates
    const uniqueProviders = allProviders.filter((provider, index, self) =>
      index === self.findIndex((p) => p.provider_id === provider.provider_id)
    );
    
    return uniqueProviders.map((item: any) => ({
      provider_name: item.provider_name,
      logo_path: `https://image.tmdb.org/t/p/original${item.logo_path}`,
      provider_id: item.provider_id
    }));
  } catch (error) {
    console.error('Error fetching watch providers:', error);
    return getWatchProviders(contentId); // Fallback to mock data
  }
};

// Mock function to get watch providers
export const getWatchProviders = (contentId: number): WatchProvider[] => {
  // This is mock data - in a real app, you would fetch from an API
  const mockProviders: Record<number, WatchProvider[]> = {
    1: [
      { provider_name: "Netflix", logo_path: "https://image.tmdb.org/t/p/original/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg", provider_id: 8 },
      { provider_name: "Amazon Prime", logo_path: "https://image.tmdb.org/t/p/original/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg", provider_id: 9 }
    ],
    2: [
      { provider_name: "Disney+", logo_path: "https://image.tmdb.org/t/p/original/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg", provider_id: 337 },
      { provider_name: "Hulu", logo_path: "https://image.tmdb.org/t/p/original/giwM8XX4V2AQb9vsoN7yti82tKK.jpg", provider_id: 15 }
    ],
    3: [
      { provider_name: "HBO Max", logo_path: "https://image.tmdb.org/t/p/original/aS2zvJWn9mwiCOeaaCkIh4wleZS.jpg", provider_id: 384 },
      { provider_name: "Apple TV+", logo_path: "https://image.tmdb.org/t/p/original/6uhKBfmtzFqOcLUsArGkqXUqX8v.jpg", provider_id: 350 }
    ],
    4: [
      { provider_name: "Netflix", logo_path: "https://image.tmdb.org/t/p/original/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg", provider_id: 8 },
      { provider_name: "Paramount+", logo_path: "https://image.tmdb.org/t/p/original/xbhHHa1YgtpwhC8lb1NQ3ACVcLd.jpg", provider_id: 531 }
    ],
    5: [
      { provider_name: "Amazon Prime", logo_path: "https://image.tmdb.org/t/p/original/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg", provider_id: 9 },
      { provider_name: "Peacock", logo_path: "https://image.tmdb.org/t/p/original/8VCV78prwd9QzZnEm0ReO6bERDa.jpg", provider_id: 386 }
    ],
    // Add more mock data for remaining content IDs
    6: [
      { provider_name: "Netflix", logo_path: "https://image.tmdb.org/t/p/original/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg", provider_id: 8 },
      { provider_name: "Hulu", logo_path: "https://image.tmdb.org/t/p/original/giwM8XX4V2AQb9vsoN7yti82tKK.jpg", provider_id: 15 }
    ],
    7: [
      { provider_name: "Disney+", logo_path: "https://image.tmdb.org/t/p/original/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg", provider_id: 337 },
      { provider_name: "Amazon Prime", logo_path: "https://image.tmdb.org/t/p/original/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg", provider_id: 9 }
    ],
    8: [
      { provider_name: "HBO Max", logo_path: "https://image.tmdb.org/t/p/original/aS2zvJWn9mwiCOeaaCkIh4wleZS.jpg", provider_id: 384 },
      { provider_name: "Netflix", logo_path: "https://image.tmdb.org/t/p/original/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg", provider_id: 8 }
    ],
    9: [
      { provider_name: "Apple TV+", logo_path: "https://image.tmdb.org/t/p/original/6uhKBfmtzFqOcLUsArGkqXUqX8v.jpg", provider_id: 350 },
      { provider_name: "Paramount+", logo_path: "https://image.tmdb.org/t/p/original/xbhHHa1YgtpwhC8lb1NQ3ACVcLd.jpg", provider_id: 531 }
    ],
    10: [
      { provider_name: "Peacock", logo_path: "https://image.tmdb.org/t/p/original/8VCV78prwd9QzZnEm0ReO6bERDa.jpg", provider_id: 386 },
      { provider_name: "Amazon Prime", logo_path: "https://image.tmdb.org/t/p/original/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg", provider_id: 9 }
    ]
  };
  
  return mockProviders[contentId] || [];
};
