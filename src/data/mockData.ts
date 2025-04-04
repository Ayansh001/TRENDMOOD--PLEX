
import { Movie, Series, Review, Mood } from '../types';

// Mock Movie Data
export const movieData: Movie[] = [
  {
    id: 1,
    title: "Inception",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BZGFjOTRiYjgtYjEzMS00ZjQ2LTkzY2YtOGQ0NDI2NTVjOGFmXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_.jpg",
    genres: ["Sci-Fi", "Action", "Thriller"],
    releaseYear: 2010,
    rating: 8.8,
    runtime: 148,
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BNTYxOTYyMzE3NV5BMl5BanBnXkFtZTcwOTMxNDY3Mw@@._V1_.jpg",
    genres: ["Drama"],
    releaseYear: 1994,
    rating: 9.3,
    runtime: 142,
    overview: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
  },
  {
    id: 3,
    title: "The Dark Knight",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_.jpg",
    genres: ["Action", "Crime", "Drama"],
    releaseYear: 2008,
    rating: 9.0,
    runtime: 152,
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  },
  {
    id: 4,
    title: "La La Land",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMjExOTY3NzExM15BMl5BanBnXkFtZTgwOTM3NTg4OTE@._V1_.jpg",
    genres: ["Comedy", "Drama", "Music"],
    releaseYear: 2016,
    rating: 8.0,
    runtime: 128,
    overview: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "Rosemarie DeWitt"]
  },
  {
    id: 5,
    title: "The Avengers",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMTA0NjY0NzE4OTReQTJeQWpwZ15BbWU3MDczODg2Nzc@._V1_.jpg",
    genres: ["Action", "Sci-Fi", "Adventure"],
    releaseYear: 2012,
    rating: 8.0,
    runtime: 143,
    overview: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    director: "Joss Whedon",
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"]
  },
  {
    id: 6,
    title: "Spirited Away",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BNmU5OTQ0OWQtOTY0OS00Yjg4LWE1NDYtNDRhYWMxYWY4OTMwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    genres: ["Animation", "Adventure", "Family"],
    releaseYear: 2001,
    rating: 8.6,
    runtime: 125,
    overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    director: "Hayao Miyazaki",
    cast: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino"]
  },
  {
    id: 7,
    title: "Pulp Fiction",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BNTY1MzgzOTYxNV5BMl5BanBnXkFtZTgwMDI4OTEwMjE@._V1_.jpg",
    genres: ["Crime", "Drama"],
    releaseYear: 1994,
    rating: 8.9,
    runtime: 154,
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
  },
  {
    id: 8,
    title: "Parasite",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    genres: ["Drama", "Thriller"],
    releaseYear: 2019,
    rating: 8.5,
    runtime: 132,
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    director: "Bong Joon Ho",
    cast: ["Song Kang-Ho", "Lee Sun-kyun", "Cho Yeo-jeong"]
  },
  {
    id: 9,
    title: "Paddington 2",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMmYwNWZlNzEtNjE4Zi00NzQ4LWI2YmUtOWZhNzZhZDYyNmVmXkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BZmUwOWU3ZTEtNjI0Mi00YWI0LTgyNGEtYzk1N2FiNWNkYTA1XkEyXkFqcGdeQXVyNzY4MDYyNjE@._V1_.jpg",
    genres: ["Adventure", "Comedy", "Family"],
    releaseYear: 2017,
    rating: 7.8,
    runtime: 103,
    overview: "Paddington, now happily settled with the Brown family and a popular member of the local community, picks up a series of odd jobs to buy the perfect present for his Aunt Lucy's 100th birthday, only for the gift to be stolen.",
    director: "Paul King",
    cast: ["Ben Whishaw", "Hugh Bonneville", "Hugh Grant"]
  },
  {
    id: 10,
    title: "The Matrix",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    genres: ["Action", "Sci-Fi"],
    releaseYear: 1999,
    rating: 8.7,
    runtime: 136,
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
  }
];

// Mock Series Data
export const seriesData: Series[] = [
  {
    id: 101,
    title: "Breaking Bad",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BNDkyZThhNmMtZDBjYS00NDBmLTlkMjgtNWM2ZWYzZDQxZWU1XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
    genres: ["Crime", "Drama", "Thriller"],
    firstAirDate: 2008,
    lastAirDate: 2013,
    rating: 9.5,
    seasons: 5,
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    creator: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"]
  },
  {
    id: 102,
    title: "Stranger Things",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BODI4NDY1NzkyM15BMl5BanBnXkFtZTgwNzAzMzc4OTE@._V1_.jpg",
    genres: ["Drama", "Fantasy", "Horror"],
    firstAirDate: 2016,
    rating: 8.7,
    seasons: 4,
    overview: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
    creator: "The Duffer Brothers",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"]
  },
  {
    id: 103,
    title: "The Office",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMjI1MTcwODk0MV5BMl5BanBnXkFtZTgwMTgwODI3NjM@._V1_.jpg",
    genres: ["Comedy"],
    firstAirDate: 2005,
    lastAirDate: 2013,
    rating: 9.0,
    seasons: 9,
    overview: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
    creator: "Greg Daniels, Ricky Gervais, Stephen Merchant",
    cast: ["Steve Carell", "Jenna Fischer", "John Krasinski"]
  },
  {
    id: 104,
    title: "Game of Thrones",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BZjUzYmQwNGMtZDc2MC00NDI4LWI0OGQtNjVlMjY1M2E2NjFhXkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_.jpg",
    genres: ["Action", "Adventure", "Drama"],
    firstAirDate: 2011,
    lastAirDate: 2019,
    rating: 9.2,
    seasons: 8,
    overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    creator: "David Benioff, D.B. Weiss",
    cast: ["Emilia Clarke", "Peter Dinklage", "Kit Harington"]
  },
  {
    id: 105,
    title: "Friends",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BZGQ2YmMxZmEtYjI5OS00NzlkLTlkNTEtYWMyMzkyMzc2MDU5XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
    genres: ["Comedy", "Romance"],
    firstAirDate: 1994,
    lastAirDate: 2004,
    rating: 8.9,
    seasons: 10,
    overview: "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
    creator: "David Crane, Marta Kauffman",
    cast: ["Jennifer Aniston", "Courteney Cox", "Lisa Kudrow"]
  },
  {
    id: 106,
    title: "The Mandalorian",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjRlMzg3ZWQtODUxOS00ZmZhLTk4Y2MtN2Q2NDkzZjU5ZGRjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BNGU4YmU4YmItMzU1MC00NzM5LWE3ZjEtZTMzMzYwYjBkYjkxXkEyXkFqcGdeQXVyMjQ0NzcxNjM@._V1_.jpg",
    genres: ["Action", "Adventure", "Fantasy"],
    firstAirDate: 2019,
    rating: 8.7,
    seasons: 3,
    overview: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    creator: "Jon Favreau",
    cast: ["Pedro Pascal", "Carl Weathers", "Giancarlo Esposito"]
  },
  {
    id: 107,
    title: "Black Mirror",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYTM3YWVhMDMtNjczMy00NGEyLWJhZDctYjNhMTRkNDE0ZTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BMTMzMDcxNjUzOF5BMl5BanBnXkFtZTgwMTM0MzA0NzM@._V1_.jpg",
    genres: ["Drama", "Sci-Fi", "Thriller"],
    firstAirDate: 2011,
    rating: 8.8,
    seasons: 6,
    overview: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
    creator: "Charlie Brooker",
    cast: ["Daniel Lapaine", "Hannah John-Kamen", "Michaela Coel"]
  },
  {
    id: 108,
    title: "The Crown",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjctNTRmNy00Njk3LWFjMzctMWQwZDAwMGJmY2MyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BNGI1ODkzZDQtZTYxYS00MTg1LWFlY2QtMTgyNTE4OGI1MmYyXkEyXkFqcGdeQXVyNjU2ODM5MjU@._V1_.jpg",
    genres: ["Biography", "Drama", "History"],
    firstAirDate: 2016,
    rating: 8.7,
    seasons: 5,
    overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    creator: "Peter Morgan",
    cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton"]
  },
  {
    id: 109,
    title: "Ted Lasso",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTdmZjBjZjQtY2JiNS00Y2ZlLTg2NzgtMjUzMGY2OTVmOWJiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BODYwMTMzNjM2N15BMl5BanBnXkFtZTgwMTA2Nzk4NjM@._V1_.jpg",
    genres: ["Comedy", "Drama", "Sport"],
    firstAirDate: 2020,
    rating: 8.8,
    seasons: 3,
    overview: "American college football coach Ted Lasso heads to London to manage AFC Richmond, a struggling English Premier League soccer team.",
    creator: "Bill Lawrence, Jason Sudeikis, Brendan Hunt, Joe Kelly",
    cast: ["Jason Sudeikis", "Hannah Waddingham", "Jeremy Swift"]
  },
  {
    id: 110,
    title: "Succession",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BODY5YjA3N2QtN2Y1Zi00M2EwLTlmODEtYTdlOGVlZDZiYmFkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BOGRkYTUxYjAtMWMyYS00MjRiLWI0ZTItYTQ1YzUwMGQwNjRlXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg",
    genres: ["Drama"],
    firstAirDate: 2018,
    lastAirDate: 2023,
    rating: 8.8,
    seasons: 4,
    overview: "The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.",
    creator: "Jesse Armstrong",
    cast: ["Brian Cox", "Jeremy Strong", "Sarah Snook"]
  }
];

// Mock Review Data
export const reviewData: { [id: number]: Review[] } = {
  1: [
    {
      id: 1,
      content: "A mind-bending masterpiece that keeps you thinking long after it's over.",
      author: "MovieBuff123",
      rating: 9,
      date: "2020-05-15"
    },
    {
      id: 2,
      content: "Sometimes confusing but always entertaining. The visuals are stunning.",
      author: "CinemaFan",
      rating: 8,
      date: "2019-11-22"
    },
    {
      id: 3,
      content: "Too complex for its own good. Style over substance.",
      author: "CriticEye",
      rating: 6,
      date: "2021-02-10"
    }
  ],
  8: [
    {
      id: 1,
      content: "A perfect blend of social commentary, humor, and suspense. Deserved all its awards.",
      author: "FilmScholar",
      rating: 10,
      date: "2020-01-15"
    },
    {
      id: 2,
      content: "Unpredictable and brilliant. One of the best films of the decade.",
      author: "MovieGoer22",
      rating: 9,
      date: "2020-03-05"
    },
    {
      id: 3,
      content: "Overrated. Good, but not as revolutionary as people claim.",
      author: "HonestReviewer",
      rating: 7,
      date: "2020-06-18"
    }
  ],
  101: [
    {
      id: 1,
      content: "The perfect television show. Bryan Cranston's performance is legendary.",
      author: "TVEnthusiast",
      rating: 10,
      date: "2018-10-03"
    },
    {
      id: 2,
      content: "Gets better with each season. The character development is unmatched.",
      author: "SeriesJunkie",
      rating: 10,
      date: "2019-05-22"
    },
    {
      id: 3,
      content: "A bit slow at times, but the payoff is always worth it.",
      author: "PatientViewer",
      rating: 8,
      date: "2020-01-14"
    }
  ],
  103: [
    {
      id: 1,
      content: "The funniest show ever made. I've watched it countless times.",
      author: "ComedyLover",
      rating: 10,
      date: "2019-12-05"
    },
    {
      id: 2,
      content: "Not as good after Steve Carell left, but still enjoyable.",
      author: "HonestFan",
      rating: 7,
      date: "2020-07-19"
    },
    {
      id: 3,
      content: "Perfect comfort show. Always makes me laugh.",
      author: "TVBinger",
      rating: 9,
      date: "2021-03-30"
    }
  ]
};

// Mood-based recommendation function
export const getMoodBasedRecommendations = (mood: Mood) => {
  switch (mood) {
    case 'happy':
      return [...movieData, ...seriesData].filter(item => 
        (item as Movie).genres?.some(genre => ['Comedy', 'Animation', 'Family', 'Adventure'].includes(genre)) ||
        (item as Series).genres?.some(genre => ['Comedy', 'Animation', 'Family', 'Adventure'].includes(genre))
      );
    case 'sad':
      return [...movieData, ...seriesData].filter(item => 
        (item as Movie).genres?.some(genre => ['Drama', 'Romance'].includes(genre)) ||
        (item as Series).genres?.some(genre => ['Drama', 'Romance'].includes(genre))
      );
    case 'excited':
      return [...movieData, ...seriesData].filter(item => 
        (item as Movie).genres?.some(genre => ['Action', 'Adventure', 'Thriller', 'Sci-Fi'].includes(genre)) ||
        (item as Series).genres?.some(genre => ['Action', 'Adventure', 'Thriller', 'Sci-Fi'].includes(genre))
      );
    case 'bored':
      return [...movieData, ...seriesData].filter(item => 
        ((item as Movie).rating || (item as Series).rating) >= 8.5
      );
    case 'stressed':
      return [...movieData, ...seriesData].filter(item => 
        (item as Movie).genres?.some(genre => ['Comedy', 'Animation', 'Family'].includes(genre)) ||
        (item as Series).genres?.some(genre => ['Comedy', 'Animation', 'Family'].includes(genre))
      );
    default:
      return [...movieData, ...seriesData].sort(() => 0.5 - Math.random()).slice(0, 10);
  }
};

// Trending content
export const trendingContent = [
  movieData[7], // Parasite
  seriesData[1], // Stranger Things
  movieData[3], // La La Land
  seriesData[8], // Ted Lasso
  seriesData[9], // Succession
  movieData[1], // Shawshank
  seriesData[3], // Game of Thrones
  movieData[9], // The Matrix
];
