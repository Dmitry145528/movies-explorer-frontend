function FilterCheckBox() {
  return (
    <>
      <label className="search__toggle">
        <input className="search__toggle_checkbox" type="checkbox" />
        <div className="search__toggle_switch"></div>
      </label>
      <p className="search__toggle_label">Короткометражки</p>
    </>
  )
}

export default FilterCheckBox