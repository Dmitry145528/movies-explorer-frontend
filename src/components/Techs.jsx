function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__content">
        <h3 className="techs__content_title">7 технологий</h3>
        <p className="techs__content_text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <aside>
          <ul className="techs__list">
            <li><a href="https://ru.wikipedia.org/wiki/HTML" rel="noreferrer noopener"
              target="_blank" className="techs__list_link">HTML</a></li>
            <li><a href="https://ru.wikipedia.org/wiki/CSS" rel="noreferrer noopener"
              target="_blank" className="techs__list_link">CSS</a></li>
            <li><a href="https://ru.wikipedia.org/wiki/JavaScript" rel="noreferrer noopener"
              target="_blank" className="techs__list_link">JS</a></li>
            <li><a href="https://ru.wikipedia.org/wiki/React" rel="noreferrer noopener"
              target="_blank" className="techs__list_link">React</a></li>
            <li><a href="https://ru.wikipedia.org/wiki/Git" rel="noreferrer noopener"
              target="_blank" className="techs__list_link">Git</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Express.js" rel="noreferrer noopener"
              target="_blank" className="techs__list_link">Express.js</a></li>
            <li><a href="https://en.wikipedia.org/wiki/MongoDB" rel="noreferrer noopener"
              target="_blank" className="techs__list_link">mongoDB</a></li>
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default Techs