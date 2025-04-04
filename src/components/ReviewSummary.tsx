
import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { summarizeReviews } from '../utils/recommendationUtils';

interface ReviewSummaryProps {
  reviews: any[];
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ reviews }) => {
  const { positive, negative, positivePercentage } = summarizeReviews(reviews);
  
  return (
    <div className="bg-netflix-darkgray rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Review Summary</h3>
      
      <div className="flex items-center mb-6">
        <div 
          className="relative h-4 bg-netflix-gray rounded-full w-full overflow-hidden"
          aria-label={`${positivePercentage}% positive reviews`}
        >
          <div 
            className="absolute left-0 top-0 h-full bg-netflix-red"
            style={{ width: `${positivePercentage}%` }}
          />
        </div>
        <span className="ml-3 font-bold">{positivePercentage}%</span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-2">
            <ThumbsUp className="text-green-500 mr-2 h-5 w-5" />
            <h4 className="font-semibold">What viewers loved:</h4>
          </div>
          <ul className="space-y-2">
            {positive.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <ThumbsDown className="text-red-500 mr-2 h-5 w-5" />
            <h4 className="font-semibold">What viewers mentioned:</h4>
          </div>
          <ul className="space-y-2">
            {negative.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
