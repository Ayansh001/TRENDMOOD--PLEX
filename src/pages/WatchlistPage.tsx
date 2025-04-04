
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ListChecks, Clock, AlertTriangle } from 'lucide-react';
import WatchlistItem from '../components/WatchlistItem';
import { WatchlistItem as WatchlistItemType } from '../types';
import { useToast } from '@/hooks/use-toast';

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load watchlist from localStorage
    const loadWatchlist = () => {
      try {
        const savedWatchlist = localStorage.getItem('watchlist');
        if (savedWatchlist) {
          setWatchlist(JSON.parse(savedWatchlist));
        }
      } catch (error) {
        console.error('Error loading watchlist:', error);
        toast({
          title: "Error loading watchlist",
          description: "There was a problem loading your watchlist.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWatchlist();
    
    // Check for reminders that need to be activated
    const checkReminders = () => {
      if (!('Notification' in window)) {
        console.log('This browser does not support desktop notifications');
        return;
      }
      
      // Get permission for notifications if needed
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
      
      if (Notification.permission === 'granted') {
        const now = new Date();
        const updatedWatchlist = [...watchlist];
        let hasChanges = false;
        
        updatedWatchlist.forEach(item => {
          if (item.reminder && !item.reminder.notificationSent) {
            const reminderDateTime = new Date(`${item.reminder.date}T${item.reminder.time}`);
            
            // If reminder time has passed and notification not sent
            if (reminderDateTime <= now) {
              new Notification(`Time to watch ${item.title}!`, {
                body: `You set a reminder to watch this today at ${item.reminder.time}.`,
                icon: item.posterUrl
              });
              
              // Mark as sent
              item.reminder.notificationSent = true;
              hasChanges = true;
            }
          }
        });
        
        if (hasChanges) {
          localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
          setWatchlist(updatedWatchlist);
        }
      }
    };
    
    checkReminders();
    const reminderInterval = setInterval(checkReminders, 60000); // Check every minute
    
    return () => clearInterval(reminderInterval);
  }, [toast, watchlist]);
  
  const handleRemoveItem = (id: number) => {
    try {
      // Filter out the item
      const updatedWatchlist = watchlist.filter(item => item.id !== id);
      
      // Update state and localStorage
      setWatchlist(updatedWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      
      toast({
        title: "Item removed",
        description: "The item was removed from your watchlist.",
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Error removing item",
        description: "There was a problem removing the item from your watchlist.",
        variant: "destructive"
      });
    }
  };
  
  const hasReminders = watchlist.some(item => item.reminder);
  
  return (
    <Layout>
      <div className="pt-8 pb-16">
        <div className="flex items-center justify-center mb-4">
          <ListChecks className="h-8 w-8 text-netflix-red mr-2" />
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Your Watchlist
          </h1>
        </div>
        
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
          Keep track of movies and shows you want to watch and set reminders.
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
          </div>
        ) : (
          <>
            {watchlist.length > 0 ? (
              <div className="space-y-6">
                {hasReminders && (
                  <div className="bg-netflix-darkgray p-4 rounded-lg flex items-start">
                    <Clock className="text-netflix-red h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      Reminders are set for some items in your watchlist. You'll receive a browser notification at the scheduled time if this tab is open.
                    </p>
                  </div>
                )}
                
                {/* Notify about notifications if permission is denied */}
                {'Notification' in window && Notification.permission === 'denied' && (
                  <div className="bg-netflix-gray p-4 rounded-lg flex items-start">
                    <AlertTriangle className="text-yellow-500 h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      Notifications are blocked in your browser. To receive reminders, please enable notifications for this site in your browser settings.
                    </p>
                  </div>
                )}
                
                {watchlist.map(item => (
                  <WatchlistItem 
                    key={item.id} 
                    item={item} 
                    onRemove={handleRemoveItem} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-netflix-darkgray rounded-lg">
                <ListChecks className="h-16 w-16 text-netflix-gray mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Your watchlist is empty</h2>
                <p className="text-gray-400 mb-6">
                  Browse movies and shows and click the + button to add them to your watchlist.
                </p>
                <a href="/" className="neon-button">
                  Discover Content
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default WatchlistPage;
