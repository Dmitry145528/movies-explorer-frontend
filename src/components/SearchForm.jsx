import SearchIcon from '../images/search-icon.svg'
import FilterCheckBox from "./FilterCheckbox";
import { useFormAndValidation } from "../hooks/useFormAndValidation"

function SearchForm() {

  const { values, handleChange } = useFormAndValidation();

  return (
    <section className="search">
      <div className="search__container">
        <img src={SearchIcon} alt="Иконка поиска" className="search__icon" />
        <form className="search__form">
          <fieldset className="search__fieldset">
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
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
          <FilterCheckBox />
        </div>
      </div>
      <div className="search__filter_mobile">
        <FilterCheckBox />
      </div>
    </section>
  )
}

export default SearchForm