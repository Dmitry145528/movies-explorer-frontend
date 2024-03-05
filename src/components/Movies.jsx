import SearchMovies from './SearchMovies';
import MoviesCardList from './MoviesCardList';
import MoviesCard from './MoviesCard';
import Preloader from './Preloader';
import { useState, useEffect } from 'react';
import moviesApi from '../utils/MoviesApi';
import mainApi from '../utils/MainApi';

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
        setLoading(true);
        // В противном случае, выполните запрос к API
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
            setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [isSubmitted]);

  useEffect(() => {
    mainApi.getLikedMovies()
      .then((data) => {
        setLikedMovies(data.map((movie) => movie.movieId));
      })
      .catch((err) => {
        console.log("Ошибка при запросе сохранённых фильмов", err);
      });
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
      ? movies.filter(movie => movie.duration && movie.duration <= 40)
      : prevResult;

    return filteredShortMovies;
  }

  function getVisibleMovies() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1199) {
      return 16;
    } else if (screenWidth >= 930) {
      return 12;
    } else if (screenWidth >= 590) {
      return 8;
    } else {
      return 5;
    }
  }

  function getCardsToAdd() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1199) {
      return 4;
    } else if (screenWidth >= 930) {
      return 3;
    } else if (screenWidth >= 590 && screenWidth <= 929) {
      return 2;
    } else {
      return 2;
    }
  }

  const handleShowMore = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + getCardsToAdd());
  };

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        setVisibleMovies(getVisibleMovies());
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="content">
      <SearchMovies
        setIsSubmitted={setIsSubmitted}
        onChange={handleChange}
        setIsInitialSubmitted={setIsInitialSubmitted}
        value={values}
        shortFilm={shortFilm}
        setShortFilm={setShortFilm}
      />
      {loading && !error && <Preloader />}
      {error && <p className="not-found__text not-found__result">{error}</p>}
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