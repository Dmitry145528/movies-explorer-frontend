import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import MoviesCard from './MoviesCard';
import { useState, useEffect } from 'react';
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import mainApi from '../utils/MainApi';

function SavedMovies() {
  const { values, handleChange } = useFormAndValidation();

  const [visibleMovies, setVisibleMovies] = useState(16);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInitialSubmitted, setIsInitialSubmitted] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);
  const [error, setError] = useState('');
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setError(null);

    mainApi.getLikedMovies()
      .then((data) => {
        setLikedMovies(data.map((movie) => movie));
        setIsInitialSubmitted(true);
        setUpdate(false);
      })
      .catch((err) => {
        console.log("Ошибка при запросе сохранённых фильмов", err);
      })
  }, [update]);

  console.log(likedMovies);

  useEffect(() => {
    if (isSubmitted) {
      const filteredMovies = filterMovies(likedMovies, values.search);
      setLikedMovies(filteredMovies);
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  // Фильтрация по имени (nameRU или nameEN) в зависимости от текущего языка
  function filterMovies(initialMovies, searchValue) {
    const filteredMovies = searchValue.trim() !== ""
      ? initialMovies.filter(movie => (
        movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchValue.toLowerCase())
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

  const handleShowMore = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 4);
  };

  return (
    <main className="content">
      <SearchForm
        setIsSubmitted={setIsSubmitted}
        onChange={handleChange}
        setIsInitialSubmitted={setIsInitialSubmitted}
        value={values} />
      {error && <p className="not-found__text not-found__result">{error}</p>} {/* Показываем сообщение об ошибке, если она произошла */}
      {!error && likedMovies.length === 0 && isInitialSubmitted && (
        <p className="not-found__text not-found__result">По вашему запросу ничего не найдено!</p>
      )}
      {!error && likedMovies.length > 0 && (
        <MoviesCardList
          movieItems={!isSubmitted && likedMovies.slice(0, visibleMovies).map(movie => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              likedMovies={likedMovies}
              setUpdate={setUpdate}
            />
          ))}
        />
      )}
      {visibleMovies < likedMovies.length && !isSubmitted && (
        <button className="elements__button" onClick={handleShowMore}>
          Ещё
        </button>
      )}
    </main>
  );
}

export default SavedMovies