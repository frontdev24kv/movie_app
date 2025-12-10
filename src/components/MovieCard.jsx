import React from 'react';

export const MovieCard = ({ movie, isFavorite, toggleFavorites, openModal }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}.png`
    : 'https://dummyimage.com/500x750/cccccc/000000&text=No+Poster';

  return (
    <div className="my-4 group rounded-2xl overflow-hidden shadow-lg relative">
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-96 object-cover group-hover:scale-110 duration-300"
      />

      <div
        className="text-center p-4 absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 duration-300 flex flex-col justify-center items-center
      "
      >
        <h2 className="text-xl font-bold text-white mb-2">{movie.title}</h2>
        <p className="text-gray-300 mb-4">
          {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
        </p>
        <div className="flex gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => openModal(movie.id)}
          >
            Details
          </button>
          <button
            className={`btn btn-sm ${isFavorite(movie.id) ? 'btn-error' : 'btn-success'}`}
            onClick={() => toggleFavorites(movie)}
          >
            {isFavorite(movie.id) ? 'Remove' : 'Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
};
