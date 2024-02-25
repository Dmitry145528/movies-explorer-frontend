import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import MoviesCard from './MoviesCard';
import Preloader from './Preloader';
import { useState, useEffect } from 'react'
import moviesApi from '../utils/MoviesApi';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(16);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMoviesData = () => {
      moviesApi.getInitialMovies()
        .then((initialMovies) => {
          setLoading(true);
          setMovies(initialMovies);
        })
        .catch((error) => {
          console.error('Ошибка при запросе к API:', error);
        })
        .finally(() => {
          setLoading(false);
        })
    };

    fetchMoviesData();
  }, []);

  const handleShowMore = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 4);
  };

  return (
    <main className="content">
      <SearchForm />
      {loading ? (
        <Preloader />
      ) : movies.length === 0 ? (
        <p className="not-found__text not-found__result">По вашему запросу ничего не найдено!</p>
      ) : (
        <MoviesCardList
          movieItems={movies.slice(0, visibleMovies).map(movie => (
            <MoviesCard
              key={movie.id}
              movie={movie}
            />
          ))}
        />
      )}
      {visibleMovies < movies.length && (
        <button className="elements__button" onClick={handleShowMore}>
          Ещё
        </button>
      )}
    </main>
  );
}

export default Movies;