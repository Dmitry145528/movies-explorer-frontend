function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__content">
        <h3 className="about-project__content_title">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__content_text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <h3 className="about-project__content_title">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__content_text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__table">
        <p className="about-project__table_title">1 неделя</p>
        <p className="about-project__table_title">4 недели</p>
        <p className="about-project__table_text">Back-end</p>
        <p className="about-project__table_text">Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;