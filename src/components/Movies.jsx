import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import MoviesCard from './MoviesCard';
import Preloader from './Preloader';
import { useState, useEffect } from 'react';
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import moviesApi from '../utils/MoviesApi';

function Movies() {

  const { values, handleChange } = useFormAndValidation();

  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(16);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('Нужно ввести ключевое слово');

  useEffect(() => {
    if (isSubmitted) {
      const fetchMoviesData = () => {
        setLoading(true);
        setError(null); // Сброс ошибки перед новым запросом

        if (!values.search.trim()) {
          setLoading(false);
          setError('Нужно ввести ключевое слово');
          setIsSubmitted(false);
          return
        }

        moviesApi.getInitialMovies()
          .then((initialMovies) => {
            // Фильтрация по имени (nameRU или nameEN) в зависимости от текущего языка
            const filteredMovies = initialMovies.filter(movie => {
              return (
                movie.nameRU.toLowerCase().includes(values.search.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(values.search.toLowerCase())
              );
            });

            setMovies(filteredMovies);
          })
          .catch((error) => {
            console.error('Ошибка при запросе к API:', error);
            setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          })
          .finally(() => {
            setLoading(false);
            setIsSubmitted(false);
          });
      };
      fetchMoviesData();
    }
  }, [isSubmitted]);

  const handleShowMore = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 4);
  };

  return (
    <main className="content">
      <SearchForm setIsSubmitted={setIsSubmitted} onChange={handleChange} value={values} />
      {loading && !error && <Preloader />} {/* Показываем прелоадер только при загрузке и без ошибок */}
      {error && <p className="not-found__text not-found__result">{error}</p>} {/* Показываем сообщение об ошибке, если она произошла */}
      {!loading && !error && movies.length === 0 && (
        <p className="not-found__text not-found__result">По вашему запросу ничего не найдено!</p>
      )}
      {!loading && !error && movies.length > 0 && (
        <MoviesCardList
          movieItems={!isSubmitted && movies.slice(0, visibleMovies).map(movie => (
            <MoviesCard
              key={movie.id}
              movie={movie}
            />
          ))}
        />
      )}
      {visibleMovies < movies.length && !loading && isSubmitted && (
        <button className="elements__button" onClick={handleShowMore}>
          Ещё
        </button>
      )}
    </main>
  );
}

export default Movies;