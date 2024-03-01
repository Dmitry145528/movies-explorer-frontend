import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import MoviesCard from './MoviesCard';
import Preloader from './Preloader';
import { useState, useEffect } from 'react';

function SavedMovies() {
  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(16);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));

        setMovies();
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchMoviesData();
  }, []);

  const handleShowMore = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 16);
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
              key={movie._id}
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

export default SavedMovies