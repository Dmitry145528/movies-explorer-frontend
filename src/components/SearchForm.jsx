import SearchIcon from '../images/search-icon.svg';
import FilterCheckBox from "./FilterCheckbox";

function SearchForm({ setIsSubmitted, onChange, value, setIsInitialSubmitted, shortFilm, setShortFilm }) {

  const handleCheckboxChange = () => {
    setShortFilm(!shortFilm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsInitialSubmitted(true);
  }

  return (
    <section className="search">
      <div className="search__container">
        <img src={SearchIcon} alt="Иконка поиска" className="search__icon" />
        <form className="search__form" onSubmit={handleSubmit}>
          <fieldset className="search__fieldset">
            <input
              id="search"
              name="search"
              type="text"
              value={value.name}
              onChange={onChange}
              className='search__input'
              placeholder="Фильм"
            />
          </fieldset>
          <button className="search__button" aria-label={`Кнопка с надписью найти`}>
            {'Найти'}
          </button>
        </form>
        <span className="search__line"></span>
        <div className="search__filter">
          <FilterCheckBox
            handleCheckboxChange={handleCheckboxChange}
            shortFilm={shortFilm}
          />
        </div>
      </div>
      <div className="search__filter_mobile">
        <FilterCheckBox
        handleCheckboxChange={handleCheckboxChange}
        shortFilm={shortFilm}
        />
      </div>
    </section>
  )
}

export default SearchForm;