import React from 'react'
import '../../css/aboutUs.css/aboutUsIntro.css'

const Introduction = ({
  title = "Who We Are",
  children,
  imageSrc,       
  imageAlt = "Our cake shop",
  imagePosition = "right", 
  rounded = true
}) => {
  const rootClass = `about-intro about-intro--image-${imagePosition}`

  return (
    <section className={rootClass}>
      <div className="about-intro__container">
        <div className="about-intro__content">
          <h2 className="about-intro__title">{title}</h2>
          <p className="about-intro__text">
            {children || (
              <>
                Welcome to our cake shop — a cozy, family-run bakery where every cake is made
                with love and the finest ingredients. We bake classic favorites and creative
                custom cakes for birthdays, weddings, and special moments.
              </>
            )}
          </p>
        </div>

        {imageSrc && (
          <figure className={`about-intro__media ${rounded ? 'about-intro__media--rounded' : ''}`}>
            <picture>
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                className="about-intro__img"
                decoding="async"
              />
            </picture>
            <figcaption className="about-intro__overlay" aria-hidden="true" />
          </figure>
        )}
      </div>
    </section>
  )
}

export default Introduction
