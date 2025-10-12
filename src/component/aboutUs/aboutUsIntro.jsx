import React from 'react'
import '../../css/aboutUs.css/aboutUsIntro.css'

const Introduction = ({
  children,
  imageSrc,
  imageAlt = "Our cake shop",
  imagePosition = "right",
  rounded = true
}) => {
  const rootClass = `about-intro about-intro--image-${imagePosition}`

  // when imagePosition is 'background' we set a CSS variable so the CSS can use the image as a section background
  const cssVarStyle = imageSrc && imagePosition === 'background'
    ? { ['--about-bg-image']: `url(${imageSrc})` }
    : undefined

  return (
    <section className={rootClass} style={cssVarStyle}>
      <div className="about-intro__container">
        <div className="about-intro__content">
          {/* changed: use semantic headings and a paragraph wrapper */}
          <header className="about-intro__header">
            <h1>
              Welcome to <span className="about-intro__brand">Slice of Heaven</span>
            </h1>
            <h2 className="about-intro__subtitle">– Where Every Moment Tastes Divine!</h2>
            <a className="about-intro__cta" href="/products">Explore Our Cakes</a>
          </header>

          <div className="about-intro__text">
            {children || (
              <>
                At Slice of Heaven, we believe that life's sweetest moments deserve to be celebrated with something truly special. Since our founding, we've been crafting exquisite cakes that bring joy to every occasion – from birthdays and weddings to those simple moments when you just need a little sweetness in your day. Using only the finest ingredients and time-honored baking techniques, each cake we create is a masterpiece of flavor and artistry. Our passionate bakers pour their hearts into every layer, every swirl of frosting, every delicate decoration – because we know that a cake is more than just dessert. It's a memory in the making, a celebration of love, and a taste of pure happiness. Welcome to Slice of Heaven, where every bite is bliss.
              </>
            )}
          </div>
        </div>

        {/* Render a foreground image unless we're using the image as a section background */}
        {imageSrc && imagePosition !== 'background' && (
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
// ...existing code...