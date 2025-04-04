import React, { useState } from "react";

interface YoutubeTrailerProps {
  videoId: string;
  title: string;
}

const YoutubeTrailer: React.FC<YoutubeTrailerProps> = ({ videoId, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg">
      {/* Loading Spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex justify-center items-center bg-black">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      )}

      {/* Error Message */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black text-white">
          <p className="text-lg font-semibold">⚠️ Trailer Unavailable</p>
          <p className="text-sm opacity-75">Please try again later.</p>
        </div>
      )}

      {/* YouTube Embed */}
      {!hasError && (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0`}
          title={`${title} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setTimeout(() => setIsLoading(false), 300)} // Small delay to prevent flickering
          onError={() => setHasError(true)}
        ></iframe>
      )}
    </div>
  );
};

export default YoutubeTrailer;
