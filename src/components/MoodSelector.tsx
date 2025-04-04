
import React from 'react';
import { Smile, Frown, Zap, Clock, Loader } from 'lucide-react';
import { Mood } from '../types';

interface MoodSelectorProps {
  selectedMood: Mood;
  onSelectMood: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  const moods: { type: Mood; icon: React.ReactNode; label: string; color: string }[] = [
    { 
      type: 'happy', 
      icon: <Smile className="h-5 w-5" />, 
      label: 'Happy', 
      color: 'bg-green-500 hover:bg-green-600' 
    },
    { 
      type: 'sad', 
      icon: <Frown className="h-5 w-5" />, 
      label: 'Sad', 
      color: 'bg-blue-500 hover:bg-blue-600' 
    },
    { 
      type: 'excited', 
      icon: <Zap className="h-5 w-5" />, 
      label: 'Excited', 
      color: 'bg-yellow-500 hover:bg-yellow-600' 
    },
    { 
      type: 'bored', 
      icon: <Clock className="h-5 w-5" />, 
      label: 'Bored', 
      color: 'bg-purple-500 hover:bg-purple-600' 
    },
    { 
      type: 'stressed', 
      icon: <Loader className="h-5 w-5" />, 
      label: 'Stressed', 
      color: 'bg-red-500 hover:bg-red-600' 
    },
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-3 my-6">
      {moods.map((mood) => (
        <button
          key={mood.type}
          onClick={() => onSelectMood(mood.type)}
          className={`
            flex items-center space-x-2 mood-chip
            ${mood.color}
            ${selectedMood === mood.type ? 'ring-2 ring-white scale-110' : ''}
          `}
        >
          {mood.icon}
          <span>{mood.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
