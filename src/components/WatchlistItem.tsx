// src/components/WatchlistItem.tsx
import React, { useState } from 'react';
import { Trash, Calendar, Bell, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WatchlistItem as WatchlistItemType } from '../types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface WatchlistItemProps {
  item: WatchlistItemType;
  onRemove: (id: number) => void;
}

const WatchlistItem: React.FC<WatchlistItemProps> = ({ item, onRemove }) => {
  const { toast } = useToast();
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminder, setReminder] = useState(
    item.reminder || { date: format(new Date(), 'yyyy-MM-dd'), time: '19:00', notificationSent: false }
  );
  const [reminderDate, setReminderDate] = useState(reminder.date);
  const [reminderTime, setReminderTime] = useState(reminder.time);

  const handleRemove = () => onRemove(item.id);

  const handleSetReminder = (e: React.FormEvent) => {
    e.preventDefault();

    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const updatedWatchlist = Array.isArray(watchlist)
      ? watchlist.map((watchlistItem: WatchlistItemType) =>
          watchlistItem.id === item.id
            ? { ...watchlistItem, reminder: { date: reminderDate, time: reminderTime, notificationSent: false } }
            : watchlistItem
        )
      : [];

    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));

    setReminder({ date: reminderDate, time: reminderTime, notificationSent: false });
    setShowReminderForm(false);

    toast({
      title: 'Reminder set',
      description: `You'll be reminded to watch ${item.title} on ${reminderDate} at ${reminderTime}.`,
    });
  };

  const formatAddedDate = () => {
    try {
      return format(new Date(item.addedAt), 'MMM d, yyyy');
    } catch (e) {
      return 'Unknown date';
    }
  };

  return (
    <div className="bg-netflix-darkgray rounded-lg overflow-hidden shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 h-40 md:h-auto">
          <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-4 flex-1 relative">
          <Link to={`/details/${item.id}`} className="text-xl font-bold hover:text-netflix-red transition-colors">
            {item.title}
          </Link>

          <div className="text-sm text-gray-400 mt-1">Added on {formatAddedDate()}</div>

          <p className="mt-2 text-sm line-clamp-2">{item.overview}</p>

          <div className="flex mt-4 space-x-3">
            <button
              onClick={() => setShowReminderForm(prev => !prev)}
              className={`flex items-center text-sm px-3 py-1.5 rounded-full border transition-colors ${
                reminder ? 'bg-netflix-red border-netflix-red' : 'border-gray-500 hover:border-netflix-red'
              }`}
            >
              {reminder ? (
                <>
                  <Bell className="h-4 w-4 mr-1.5" />
                  {reminder.date} at {reminder.time}
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-1.5" />
                  Add Reminder
                </>
              )}
            </button>

            <button
              onClick={handleRemove}
              className="flex items-center text-sm px-3 py-1.5 rounded-full border border-gray-500 hover:border-red-500 hover:text-red-500 transition-colors"
            >
              <Trash className="h-4 w-4 mr-1.5" />
              Remove
            </button>
          </div>

          {showReminderForm && (
            <div className="mt-4 bg-netflix-gray p-3 rounded-lg relative">
              <button
                onClick={() => setShowReminderForm(false)}
                className="absolute top-2 right-2 p-1 hover:bg-netflix-darkgray rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <h4 className="font-semibold mb-2">Set a reminder</h4>

              <form onSubmit={handleSetReminder} className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1">Date</label>
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={e => setReminderDate(e.target.value)}
                    className="w-full bg-netflix-darkgray border border-gray-600 rounded px-2 py-1 text-sm"
                    min={format(new Date(), 'yyyy-MM-dd')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1">Time</label>
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={e => setReminderTime(e.target.value)}
                    className="w-full bg-netflix-darkgray border border-gray-600 rounded px-2 py-1 text-sm"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-netflix-red text-white rounded py-1.5 text-sm hover:bg-red-700 transition-colors"
                  >
                    Set Reminder
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchlistItem;
