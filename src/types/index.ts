
export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  releaseYear: number;
  rating: number;
  runtime?: number;
  overview: string;
  director?: string;
  cast: string[];
}

export interface Series {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  firstAirDate: number;
  lastAirDate?: number;
  rating: number;
  seasons: number;
  overview: string;
  creator?: string;
  cast: string[];
}

export type Content = Movie | Series;

export interface Review {
  id: number;
  content: string;
  author: string;
  rating: number;
  date: string;
}

export type Mood = 'happy' | 'sad' | 'excited' | 'bored' | 'stressed' | 'any';

// Fixed WatchlistItem interface to correctly include Content properties
export interface WatchlistItem {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  overview: string;
  cast: string[];
  rating: number;
  
  // Movie-specific properties (optional)
  releaseYear?: number;
  runtime?: number;
  director?: string;
  
  // Series-specific properties (optional)
  firstAirDate?: number;
  lastAirDate?: number;
  seasons?: number;
  creator?: string;
  
  // WatchlistItem-specific properties
  addedAt: string;
  reminder?: {
    date: string;
    time: string;
    notificationSent: boolean;
  };
}

export interface UserPreferences {
  favoriteGenres: string[];
  watchedContent: number[];
  mood?: Mood;
}
