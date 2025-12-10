export const MovieDetailsModal = ({
  movie,
  closeModal,
  isFavorite,
  toggleFavorites
}) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}.png`
    : 'https://dummyimage.com/500x750/cccccc/000000&text=No+Poster';

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full bg-black/80 shadow-xl">
        <h3 className="font-bold text-xl sm:text-2xl mb-4">{movie.title}</h3>
        <img
          src={posterUrl}
          alt={movie.title}
          className="rounded-lg mb-4 w-full object-contain max-h-96"
        />
        <div>
          <p className="leading-relaxed">{movie.overview}</p>
          <p className="font-semibold">
            <span>Release Date:</span> {movie.release_date || 'N/A'}
          </p>
          <p className="font-semibold">
            <span>Rating:</span> {movie.vote_average.toFixed(2) || 'N/A'}
          </p>
          <p className="font-semibold">
            <span>Genres:</span>{' '}
            {movie.genres.length > 0
              ? movie.genres.map((m) => m.name).join(', ')
              : 'N/A'}
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-3 mt-6">
          <button className={`btn ${isFavorite(movie.id) ? 'btn-error' : 'btn-success'}`} onClick={() => toggleFavorites(movie)}>
            {isFavorite(movie.id) ? 'Remove' : 'Add'}
          </button>
          <button className="btn btn-info" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={closeModal}></div>
    </div>
  );
};
