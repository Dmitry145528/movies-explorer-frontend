import SearchForm from "./SearchForm";

function SearchSavedMovies({ setIsSubmitted, onChange, value, setIsInitialSubmitted, shortFilm, setShortFilm }) {
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

export default SearchSavedMovies;