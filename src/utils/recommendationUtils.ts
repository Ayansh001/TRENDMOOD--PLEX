
import { Content, Movie, Series, Mood } from '../types';
import { movieData, seriesData, getMoodBasedRecommendations } from '../data/mockData';

// Utility function to get similar content based on a title
export const getSimilarContent = (title: string): Content[] => {
  // Find the item that matches the title
  const targetMovie = movieData.find(movie => 
    movie.title.toLowerCase() === title.toLowerCase()
  );
  
  const targetSeries = seriesData.find(series => 
    series.title.toLowerCase() === title.toLowerCase()
  );
  
  const target = targetMovie || targetSeries;
  
  if (!target) {
    // If no exact match, try partial match
    const allContent = [...movieData, ...seriesData];
    const possibleMatches = allContent.filter(item => 
      item.title.toLowerCase().includes(title.toLowerCase())
    );
    
    if (possibleMatches.length > 0) {
      return findSimilarByGenre(possibleMatches[0], [...movieData, ...seriesData]);
    }
    
    // If still no match, return random trending content
    return [...movieData, ...seriesData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
  }
  
  return findSimilarByGenre(target, [...movieData, ...seriesData]);
};

// Find similar content based on genre overlap
const findSimilarByGenre = (targetContent: Content, allContent: Content[]): Content[] => {
  // Function to count shared genres
  const countSharedGenres = (item: Content) => {
    const targetGenres = 'genres' in targetContent ? targetContent.genres : [];
    const itemGenres = 'genres' in item ? item.genres : [];
    
    return itemGenres.filter(genre => targetGenres.includes(genre)).length;
  };
  
  // Filter out the target content itself
  const otherContent = allContent.filter(item => item.id !== targetContent.id);
  
  // Sort by number of shared genres
  return otherContent
    .map(item => ({
      item,
      sharedGenres: countSharedGenres(item)
    }))
    .filter(({ sharedGenres }) => sharedGenres > 0)
    .sort((a, b) => b.sharedGenres - a.sharedGenres)
    .map(({ item }) => item)
    .slice(0, 6);
};

// Generate a personalized recommendation based on query
export const getRecommendationFromQuery = (query: string): Content[] => {
  query = query.toLowerCase();

  // Extract potential genres from the query
  const genres = ['action', 'adventure', 'comedy', 'drama', 'sci-fi', 'thriller', 'horror', 'romance', 'fantasy', 'animation', 'family'];
  const mentionedGenres = genres.filter(genre => query.includes(genre));

  // Check for specific title references
  const allContent = [...movieData, ...seriesData];
  const titleMatches = allContent.filter(item => 
    query.includes(item.title.toLowerCase())
  );

  // Handle "like X but Y" patterns
  if (query.includes('like') && query.includes('but')) {
    const likeTitle = titleMatches[0]; // The title they mentioned
    
    if (likeTitle) {
      // Get similar content first
      const similarContent = findSimilarByGenre(likeTitle, allContent);
      
      // Apply additional filters based on the "but" part
      const butPart = query.split('but')[1].toLowerCase();
      
      if (butPart.includes('humor') || butPart.includes('funny') || butPart.includes('comedy')) {
        return similarContent.filter(item => 
          item.genres.includes('Comedy')
        );
      }
      
      if (butPart.includes('action') || butPart.includes('exciting')) {
        return similarContent.filter(item => 
          item.genres.includes('Action')
        );
      }
      
      if (butPart.includes('less complex') || butPart.includes('easier') || butPart.includes('simpler')) {
        return similarContent.filter(item => 
          // Assuming complexity is correlated with rating (not perfect but a proxy)
          item.rating < likeTitle.rating
        );
      }
      
      return similarContent;
    }
  }

  // Filter by mentioned genres if any
  if (mentionedGenres.length > 0) {
    return allContent.filter(item =>
      item.genres.some(genre => 
        mentionedGenres.includes(genre.toLowerCase())
      )
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
  }

  // Handle mind-blowing, best, etc.
  if (query.includes('mind') || query.includes('best') || query.includes('amazing') || query.includes('blow')) {
    return allContent
      .filter(item => item.rating >= 8.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }

  // Default to mood-based if we can detect a mood
  if (query.includes('happy') || query.includes('cheer')) {
    return getMoodBasedRecommendations('happy').slice(0, 6);
  }
  
  if (query.includes('sad') || query.includes('depress')) {
    return getMoodBasedRecommendations('sad').slice(0, 6);
  }
  
  if (query.includes('excit') || query.includes('thrill')) {
    return getMoodBasedRecommendations('excited').slice(0, 6);
  }
  
  if (query.includes('bored')) {
    return getMoodBasedRecommendations('bored').slice(0, 6);
  }
  
  if (query.includes('stress') || query.includes('relax')) {
    return getMoodBasedRecommendations('stressed').slice(0, 6);
  }

  // If all else fails, return some highly-rated content
  return allContent
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
};

// Summarize reviews for a content item
export const summarizeReviews = (reviews: any[]): { positive: string[], negative: string[], positivePercentage: number } => {
  if (!reviews || reviews.length === 0) {
    return {
      positive: ["No reviews available"],
      negative: ["No reviews available"],
      positivePercentage: 0
    };
  }

  const positiveReviews = reviews.filter(review => review.rating >= 7);
  const negativeReviews = reviews.filter(review => review.rating < 7);
  
  const positivePercentage = Math.round((positiveReviews.length / reviews.length) * 100);
  
  // Extract common themes from positive reviews
  const positiveThemes = positiveReviews.map(review => {
    const content = review.content.toLowerCase();
    if (content.includes('act')) return 'acting';
    if (content.includes('direct')) return 'direction';
    if (content.includes('vis')) return 'visuals';
    if (content.includes('story') || content.includes('plot')) return 'storyline';
    if (content.includes('character')) return 'characters';
    if (content.includes('cinematograph')) return 'cinematography';
    if (content.includes('music') || content.includes('sound')) return 'soundtrack';
    return 'overall quality';
  });
  
  // Extract common themes from negative reviews
  const negativeThemes = negativeReviews.map(review => {
    const content = review.content.toLowerCase();
    if (content.includes('long') || content.includes('pac')) return 'pacing issues';
    if (content.includes('predictable') || content.includes('cliché')) return 'predictable plot';
    if (content.includes('act')) return 'acting issues';
    if (content.includes('confus')) return 'confusing elements';
    if (content.includes('visual') || content.includes('effect')) return 'visual effects';
    if (content.includes('character')) return 'character development';
    if (content.includes('end')) return 'disappointing ending';
    return 'overall execution';
  });
  
  // Count occurrences of each theme
  const positiveThemeCounts: Record<string, number> = {};
  positiveThemes.forEach(theme => {
    positiveThemeCounts[theme] = (positiveThemeCounts[theme] || 0) + 1;
  });
  
  const negativeThemeCounts: Record<string, number> = {};
  negativeThemes.forEach(theme => {
    negativeThemeCounts[theme] = (negativeThemeCounts[theme] || 0) + 1;
  });
  
  // Convert to array of strings with percentages
  const positiveStrings = Object.entries(positiveThemeCounts)
    .map(([theme, count]) => {
      const percentage = Math.round((count / positiveReviews.length) * 100);
      return `${percentage}% of viewers loved the ${theme}`;
    })
    .sort((a, b) => parseInt(b.split('%')[0]) - parseInt(a.split('%')[0]));
  
  const negativeStrings = Object.entries(negativeThemeCounts)
    .map(([theme, count]) => {
      const percentage = Math.round((count / negativeReviews.length) * 100);
      return `${percentage}% of viewers mentioned ${theme}`;
    })
    .sort((a, b) => parseInt(b.split('%')[0]) - parseInt(a.split('%')[0]));
  
  return {
    positive: positiveStrings.length > 0 ? positiveStrings : ["No positive themes found"],
    negative: negativeStrings.length > 0 ? negativeStrings : ["No negative themes found"],
    positivePercentage
  };
};
