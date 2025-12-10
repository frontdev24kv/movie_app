import React, { useState } from 'react';

export const MovieCard = ({ movie, isFavorite, toggleFavorites, openModal }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}.png`
    : 'https://dummyimage.com/500x750/cccccc/000000&text=No+Poster';

  return (
    <div
      className="my-4 rounded-2xl overflow-hidden shadow-lg relative"
      onClick={() => setShowOverlay(!showOverlay)} // Toggle on mobile
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className={`w-full h-96 object-cover duration-300 ${
          showOverlay ? 'scale-110' : ''
        }`}
      />

      <div
        className={`text-center p-4 absolute inset-0 bg-black/70 flex flex-col justify-center items-center
          transition-opacity duration-300
          ${showOverlay ? 'opacity-100' : 'opacity-0'}
          md:group-hover:opacity-100
        `}
      >
        <h2 className="text-xl font-bold text-white mb-2">{movie.title}</h2>
        <p className="text-gray-300 mb-4">
          {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
        </p>
        <div className="flex gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={(e) => { e.stopPropagation(); openModal(movie.id); }}
          >
            Details
          </button>
          <button
            className={`btn btn-sm ${isFavorite(movie.id) ? 'btn-error' : 'btn-success'}`}
            onClick={(e) => { e.stopPropagation(); toggleFavorites(movie); }}
          >
            {isFavorite(movie.id) ? 'Remove' : 'Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
};
