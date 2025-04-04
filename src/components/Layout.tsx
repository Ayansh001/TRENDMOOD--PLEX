
import React from 'react';
import { Link } from 'react-router-dom';
import { Film, TrendingUp, Search, UserCircle, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-netflix-black text-netflix-lightgray">
      <header className="sticky top-0 z-50 bg-gradient-to-b from-netflix-black to-transparent">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Film className="h-8 w-8 text-netflix-red" />
              <span className="ml-2 text-2xl font-bold text-netflix-red">
                TrendMood<span className="text-white">Plex</span>
              </span>
            </Link>
            <nav className="hidden md:flex ml-10 space-x-6">
              <Link to="/" className="hover:text-netflix-red transition-colors">Home</Link>
              <Link to="/trending" className="hover:text-netflix-red transition-colors">Trending</Link>
              <Link to="/mood" className="hover:text-netflix-red transition-colors">Mood</Link>
              <Link to="/chat" className="hover:text-netflix-red transition-colors">AI Chat</Link>
              <Link to="/watchlist" className="hover:text-netflix-red transition-colors">Watchlist</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-netflix-gray transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-netflix-gray transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-netflix-gray transition-colors">
              <UserCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 pb-20">
        {children}
      </main>
      
      <footer className="bg-netflix-black py-8 border-t border-netflix-gray">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center">
                <Film className="h-6 w-6 text-netflix-red" />
                <span className="ml-2 text-xl font-bold text-netflix-red">
                  TrendMood<span className="text-white">Plex</span>
                </span>
              </Link>
              <p className="mt-2 text-sm text-gray-400">
                Your AI-powered movie recommendation engine
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-2">Navigation</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/trending" className="text-gray-400 hover:text-white transition-colors">Trending</Link></li>
                  <li><Link to="/mood" className="text-gray-400 hover:text-white transition-colors">Mood</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Features</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/chat" className="text-gray-400 hover:text-white transition-colors">AI Chat</Link></li>
                  <li><Link to="/watchlist" className="text-gray-400 hover:text-white transition-colors">Watchlist</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Reviews</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Connect</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="https://github.com/Ayansh001" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-netflix-gray text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} TrendMoodPlex. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;