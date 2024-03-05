import SearchForm from "./SearchForm";

function SearchSavedMovies({ setIsSubmitted, onChange, value, setIsInitialSubmitted, shortFilm, setShortFilm, isSubmitting }) {
  return (
    <SearchForm
      setIsSubmitted={setIsSubmitted}
      onChange={onChange}
      setIsInitialSubmitted={setIsInitialSubmitted}
      value={value}
      shortFilm={shortFilm}
      setShortFilm={setShortFilm}
      isSubmitting={isSubmitting}
    />
  )
}

export default SearchSavedMovies;