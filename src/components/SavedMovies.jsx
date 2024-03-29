import SearchSavedMovies from './SearchSavedMovies';
import MoviesCardList from './MoviesCardList';
import MoviesCard from './MoviesCard';
import { useState, useEffect } from 'react';
import mainApi from '../utils/MainApi';
import { NOT_FOUND_MESSAGE } from '../utils/constans';

function SavedMovies() {

  const [values, setValues] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInitialSubmitted, setIsInitialSubmitted] = useState(false);
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [prevResult, setPrevResult] = useState([]);
  const [shortFilm, setShortFilm] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Ограничитель запросов

  useEffect(() => {
    setError(null);
    if (!isSubmitting) {
      setIsSubmitting(true);
      mainApi.getLikedMovies()
        .then((data) => {
          setLikedMovies(data.map((movie) => movie));
          setPrevResult(data.map((movie) => movie));
          setMovies(data.map((movie) => movie));
        })
        .catch((err) => {
          console.log("Ошибка при запросе сохранённых фильмов", err);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }, []);

  const handleCardDelete = (deletedMovieId) => {
    // Обновляем состояния, исключив удаленный фильм
    const updatedLikedMovies = likedMovies.filter((movie) => movie.movieId !== deletedMovieId);
    const updatedPrevResult = prevResult.filter((movie) => movie.movieId !== deletedMovieId);
    const updatedMovies = movies.filter((movie) => movie.movieId !== deletedMovieId);
    setLikedMovies(updatedLikedMovies);
    setPrevResult(updatedPrevResult);
    setMovies(updatedMovies);
  };

  useEffect(() => {
    if (isSubmitted) {
      const filteredMovies = filterMovies(likedMovies, values);
      setLikedMovies(filteredMovies);
      setPrevResult(filteredMovies);
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  useEffect(() => {
    const filteredShortMovies = filterShortMovies(likedMovies, shortFilm);
    setLikedMovies(filteredShortMovies);
  }, [shortFilm]);

  const handleChange = (e) => {
    const { value } = e.target;
    setValues(value);
  }

  // Фильтрация по имени (nameRU или nameEN) в зависимости от текущего языка
  function filterMovies(likedMovies, searchValue) {
    const filteredMovies = searchValue !== ""
      ? likedMovies.filter(movie => (
        movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchValue.toLowerCase())
      ))
      : movies;

    return filteredMovies;
  }

  // Фильтрация короткометражек
  function filterShortMovies(likedMovies, shortFilm) {
    const filteredShortMovies = shortFilm
      ? likedMovies.filter(movie => movie.duration && movie.duration <= 40)
      : prevResult;

    return filteredShortMovies;
  }

  return (
    <main className="content">
      <SearchSavedMovies
        setIsSubmitted={setIsSubmitted}
        onChange={handleChange}
        setIsInitialSubmitted={setIsInitialSubmitted}
        value={values}
        shortFilm={shortFilm}
        setShortFilm={setShortFilm}
        isSubmitting={isSubmitting}
      />
      {error && <p className="not-found__text not-found__result">{error}</p>}
      {!error && likedMovies.length === 0 && isInitialSubmitted && (
        <p className="not-found__text not-found__result">{NOT_FOUND_MESSAGE}</p>
      )}
      {!error && likedMovies.length > 0 && (
        <MoviesCardList
          movieItems={!isSubmitted && likedMovies.map(movie => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              likedMovies={likedMovies}
              onDelete={handleCardDelete}
            />
          ))}
        />
      )}
    </main>
  );
}

export default SavedMovies;