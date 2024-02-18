import SearchForm from './SearchForm'
import MoviesCardList from './MoviesCardList'
import MoviesCard from './MoviesCard'
import { useState, useEffect } from 'react'

function Movies() {

  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(16); // Начальное количество отображаемых карточек

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await fetch('./src/utils/moviesData.json');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchMoviesData();
  }, []);

  const handleShowMore = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 4); // Увеличиваем количество отображаемых карточек на 16
  };

  return (
    <main className='content'>
      <SearchForm />
      <MoviesCardList
        movieItems={movies.slice(0, visibleMovies).map(movie => (
          <MoviesCard
            key={movie._id}
            movie={movie}
          />
        ))}
      />
      {visibleMovies < movies.length && (
        <button className="elements__button" onClick={handleShowMore}>
          Ещё
        </button>
      )}
    </main>
  );
}

export default Movies;