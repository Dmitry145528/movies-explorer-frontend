import SearchForm from "./SearchForm";

function SearchMovies({ setIsSubmitted, onChange, value, setIsInitialSubmitted, shortFilm, setShortFilm }) {

  return (
    <SearchForm
      setIsSubmitted={setIsSubmitted}
      onChange={onChange}
      setIsInitialSubmitted={setIsInitialSubmitted}
      value={value}
      shortFilm={shortFilm}
      setShortFilm={setShortFilm}
    />
  )
}

export default SearchMovies;