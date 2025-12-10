import { useEffect, useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Spinner } from './components/Spinner';
import { ErrorMessage } from './components/ErrorMessage';
import { MovieCard } from './components/MovieCard';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { Pagination } from './components/Pagination';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [searchTurn, setSearchTurn] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [view, setView] = useState('search');

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (view === 'favorites') {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let url;
        if (searchTurn) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            searchTurn
          )}&page=${page}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();

        setMovies(data.results);

        setTotalPages(Math.min(data.total_pages || 0, 500));
      } catch (error) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTurn, page, view]);

  const isFavorite = (movieId) => {
    return favorites.some((f) => f.id === movieId);
  };

  const toggleFavorites = (movie) => {
    isFavorite(movie.id)
      ? setFavorites((prev) => prev.filter((m) => m.id !== movie.id))
      : setFavorites((prev) => [...prev, movie]);
  };

  const openModal = async (movieId) => {
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failled to fetch movie details');
      }
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      setError('Failled to fetch movie details');
    }
  };

  const closeModal = () => setSelectedMovie(null);

  const handleSearch = (turn) => {
    setSearchTurn(turn);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if(newPage >= 1 && newPage <= totalPages){
      setPage(newPage)
    }

  }

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, initialized]);

  const displayedMovies = view === 'search' ? movies : favorites;

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-6 drop-shadow-2xl">
        Movie App
      </h1>
      <div className="tabs tabs-border mb-6">
        <a
          className={`tab text-lg ${view === 'search' ? 'tab-active' : ''}`}
          onClick={() => {
            setView('search');
            setPage(page);
          }}
        >
          Search / Popular
        </a>
        <a
          className={`tab text-lg ${view === 'favorites' ? 'tab-active' : ''}`}
          onClick={() => setView('favorites')}
        >
          Favorites{' '}
          <sup className="ml-2 p-2 bg-amber-50 text-emerald-950 rounded-2xl">
            {favorites.length}
          </sup>
        </a>
      </div>
      {view === 'search' && (
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleSearch} />
        </div>
      )}

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && displayedMovies.length === 0 && (
        <div className="my-2">
          No movies found.{' '}
          {view === 'favorites'
            ? 'Add some to your favorites.'
            : 'Try a different search.'}
        </div>
      )}
      {!loading && !error && displayedMovies.length > 0 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
          {displayedMovies.slice(0, 30).map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite}
                openModal={openModal}
                toggleFavorites={toggleFavorites}
              />
            );
          })}
        </div>
      )}
      {view === 'search' && totalPages > 1 && !loading && !error && (
        <div className="mt-6">
          <Pagination currentPage={page} totalPages={totalPages} handlePageChange={handlePageChange}/>
        </div>
      )}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          closeModal={closeModal}
          isFavorite={isFavorite}
          toggleFavorites={toggleFavorites}
        />
      )}
    </div>
  );
};
