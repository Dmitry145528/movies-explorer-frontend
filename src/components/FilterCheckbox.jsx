function FilterCheckBox() {
  return (
    <>
      <label className="search__toggle">
        <input className="search__toggle_checkbox" type="checkbox" />
        <span className="search__toggle_switch"></span>
      </label>
      <p className="search__toggle_label">Короткометражки</p>
    </>
  )
}

export default FilterCheckBox