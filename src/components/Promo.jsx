import LogoPromo from '../images/image-promo.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <div className="image__container">
        <img src={LogoPromo} alt="Картинка в виде полуколец" className="promo__img" />
      </div>
    </section>
  )
}

export default Promo;