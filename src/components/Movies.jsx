import SearchMovies from './SearchMovies';
import MoviesCardList from './MoviesCardList';
import MoviesCard from './MoviesCard';
import Preloader from './Preloader';
import { useState, useEffect } from 'react';
import moviesApi from '../utils/MoviesApi';
import mainApi from '../utils/MainApi';
import {
  NOT_FOUND_MESSAGE,
  ERROR_MESSAGE,
  MAX_MOVIES_1199,
  MAX_MOVIES_930,
  MAX_MOVIES_590,
  MAX_MOVIES,
  MAX_MOVIES_STEP_1199,
  MAX_MOVIES_STEP_930,
  MAX_MOVIES_STEP,
  MAX_WIDTH_1199,
  MAX_WIDTH_930,
  MAX_WIDTH_590,
  MAX_SHORTS_DURATION
} from '../utils/constans';

function Movies() {

  const [values, setValues] = useState('');
  const [initialMovies, setInitialMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [prevResult, setPrevResult] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(getVisibleMovies());
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInitialSubmitted, setIsInitialSubmitted] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);
  const [shortFilm, setShortFilm] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Ограничитель запросов

  useEffect(() => {
    if (isInitialSubmitted) {
      setError(null);

      const storedMovies = localStorage.getItem('movies');

      if (storedMovies) {
        // Если данные есть в локальном хранилище, используем их
        const parsedMovies = JSON.parse(storedMovies);
        setInitialMovies(parsedMovies);
        const filteredMovies = filterMovies(parsedMovies, values);
        setMovies(filteredMovies);
        setPrevResult(filteredMovies);
        setLoading(false);
      } else {
        if (!isSubmitting) {
          setLoading(true);
          setIsSubmitting(true);
          // В противном случае, выполняем запрос к API
          moviesApi.getInitialMovies()
            .then((data) => {
              setInitialMovies(data);
              localStorage.setItem('movies', JSON.stringify(data));
              const filteredMovies = filterMovies(data, values);
              setMovies(filteredMovies);
              setPrevResult(filteredMovies);
            })
            .catch((error) => {
              console.error('Ошибка при запросе к API:', error);
              setError(ERROR_MESSAGE);
            })
            .finally(() => {
              setLoading(false);
              setIsSubmitting(false);
            });
        }
      }
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      mainApi.getLikedMovies()
        .then((data) => {
          setLikedMovies(data.map((movie) => movie.movieId));
        })
        .catch((err) => {
          console.log("Ошибка при запросе сохранённых фильмов", err);
        });
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      const filteredMovies = filterMovies(initialMovies, values);
      setMovies(filteredMovies);
      setPrevResult(filteredMovies);
      setIsSubmitted(false);
      setVisibleMovies(getVisibleMovies());
    }
  }, [isSubmitted]);

  useEffect(() => {
    const filteredShortMovies = filterShortMovies(movies, shortFilm);
    setMovies(filteredShortMovies);
  }, [shortFilm, prevResult]);

  useEffect(() => {
    if (isSubmitted) {
      localStorage.setItem('searchQuery', values);
      localStorage.setItem('shortFilm', shortFilm);
    }
  }, [isSubmitted, shortFilm, values])

  useEffect(() => {
    // Наличие данных в локальном хранилище
    const storedQuery = localStorage.getItem('searchQuery');
    const storedShortFilm = localStorage.getItem('shortFilm');

    // Состояние на основе данных из локального хранилища
    if (storedQuery) {
      handleChange({ target: { name: 'search', value: storedQuery } });
      setIsSubmitted(true);
      setIsInitialSubmitted(true);
    }

    if (storedShortFilm) {
      setShortFilm(JSON.parse(storedShortFilm));
    }
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setValues(value);
  }

  // Фильтрация по имени (nameRU или nameEN) в зависимости от текущего языка
  function filterMovies(initialMovies, searchValue) {
    const filteredMovies = searchValue !== ""
      ? initialMovies.filter(movie => (
        (movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchValue.toLowerCase()))
      ))
      : [];

    // Проверка на пустой запрос и установка ошибки
    if (searchValue === "" && isInitialSubmitted) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
    }

    return filteredMovies;
  }

  // Фильтрация короткометражек
  function filterShortMovies(movies, shortFilm) {
    const filteredShortMovies = shortFilm
      ? movies.filter(movie => movie.duration && movie.duration <= MAX_SHORTS_DURATION)
      : prevResult;

    return filteredShortMovies;
  }

  function getVisibleMovies() {
    const screenWidth = window.innerWidth;
    if (screenWidth > MAX_WIDTH_1199) {
      return MAX_MOVIES_1199;
    } else if (screenWidth >= MAX_WIDTH_930) {
      return MAX_MOVIES_930;
    } else if (screenWidth >= MAX_WIDTH_590) {
      return MAX_MOVIES_590;
    } else {
      return MAX_MOVIES;
    }
  }

  function getCardsToAdd() {
    const screenWidth = window.innerWidth;
    if (screenWidth > MAX_WIDTH_1199) {
      return MAX_MOVIES_STEP_1199;
    } else if (screenWidth >= MAX_WIDTH_930) {
      return MAX_MOVIES_STEP_930;
    } else if (screenWidth >= MAX_WIDTH_590 && screenWidth <= 929) {
      return MAX_MOVIES_STEP;
    } else {
      return MAX_MOVIES_STEP;
    }
  }

  const handleShowMore = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + getCardsToAdd());
  };

  return (
    <main className="content">
      <SearchMovies
        setIsSubmitted={setIsSubmitted}
        onChange={handleChange}
        setIsInitialSubmitted={setIsInitialSubmitted}
        value={values}
        shortFilm={shortFilm}
        setShortFilm={setShortFilm}
        isSubmitting={isSubmitting}
      />
      {loading && !error && <Preloader />}
      {error && <p className="not-found__text not-found__result">{error}</p>}
      {!loading && !error && movies.length === 0 && isInitialSubmitted && (
        <p className="not-found__text not-found__result">{NOT_FOUND_MESSAGE}</p>
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