import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import MoviesCard from './MoviesCard';
import Preloader from './Preloader';
import { useState, useEffect } from 'react';
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import moviesApi from '../utils/MoviesApi';
import mainApi from '../utils/MainApi';

function Movies() {

  const { values, handleChange } = useFormAndValidation();

  const [initialMovies, setInitialMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [prevResult, setPrevResult] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(16);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInitialSubmitted, setIsInitialSubmitted] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);
  const [shortFilm, setShortFilm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isInitialSubmitted) {
      setLoading(true);
      setError(null);

      moviesApi.getInitialMovies()
        .then((data) => {
          setInitialMovies(data);
          const filteredMovies = filterMovies(data, values.search);
          setMovies(filteredMovies);
          setPrevResult(filteredMovies);
        })
        .catch((error) => {
          console.error('Ошибка при запросе к API:', error);
          setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(() => {
          setLoading(false);
        });

      mainApi.getLikedMovies()
        .then((data) => {
          setLikedMovies(data.map((movie) => movie.movieId));
        })
        .catch((err) => {
          console.log("Ошибка при запросе сохранённых фильмов", err);
        });
    }
  }, [isInitialSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      const filteredMovies = filterMovies(initialMovies, values.search);
      setMovies(filteredMovies);
      setPrevResult(filteredMovies);
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  useEffect(() => {
      const filteredShortMovies = filterShortMovies(movies, shortFilm);
      setMovies(filteredShortMovies);
  }, [shortFilm, prevResult]);

  // Фильтрация по имени (nameRU или nameEN) в зависимости от текущего языка
  function filterMovies(initialMovies, searchValue) {
    const filteredMovies = searchValue.trim() !== ""
      ? initialMovies.filter(movie => (
        (movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchValue.toLowerCase()))
      ))
      : [];

    // Проверка на пустой запрос и установка ошибки
    if (searchValue.trim() === "" && isInitialSubmitted) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
    }

    return filteredMovies;
  }

  // Фильтрация короткометражек
  function filterShortMovies(movies, shortFilm) {
    const filteredShortMovies = shortFilm
      ? movies.filter(movie => movie.duration && movie.duration <= 40)
      : prevResult;

    return filteredShortMovies;
  }

  const handleShowMore = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 4);
  };

  return (
    <main className="content">
      <SearchForm
        setIsSubmitted={setIsSubmitted}
        onChange={handleChange}
        setIsInitialSubmitted={setIsInitialSubmitted}
        value={values}
        shortFilm={shortFilm}
        setShortFilm={setShortFilm}
      />
      {loading && !error && <Preloader />} {/* Показываем прелоадер только при загрузке и без ошибок */}
      {error && <p className="not-found__text not-found__result">{error}</p>} {/* Показываем сообщение об ошибке, если она произошла */}
      {!loading && !error && movies.length === 0 && isInitialSubmitted && (
        <p className="not-found__text not-found__result">По вашему запросу ничего не найдено!</p>
      )}
      {!loading && !error && movies.length > 0 && (
        <MoviesCardList
          movieItems={!isSubmitted && movies.slice(0, visibleMovies).map(movie => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              likedMovies={likedMovies}
            />
          ))}
        />
      )}
      {visibleMovies < movies.length && !loading && !isSubmitted && (
        <button className="elements__button" onClick={handleShowMore}>
          Ещё
        </button>
      )}
    </main>
  );
}

export default Movies;