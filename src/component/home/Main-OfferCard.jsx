import React from 'react'
import '../../css/home.css/Main-Offersgrid.css'

const MainOfferCard = ({ image, title, discount }) => {
  // background div uses the inline background-image so we can blur it independently
  const bgStyle = image ? { backgroundImage: `url(${image})` } : { backgroundColor: '#ccc' }

  return (
    <div className="offer-card">
      <div className="offer-bg" style={bgStyle} />
      <div className="offer-content">
        <h2 className="offer-title">{title}</h2>
        <div className="offer-spacer" />
        <p className="offer-discount">{discount}</p>
        {!image && <small style={{ opacity: 0.8 }}>No image provided</small>}
      </div>

      <div className="offer-badge" aria-hidden>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
          <polygon points="50,5 61.76,33.82 92.80,36.10 69.02,56.18 76.45,86.41 50,70 23.55,86.41 30.98,56.18 7.20,36.10 38.24,33.82" />
        </svg>
        <span className="badge-text">{discount}</span>
      </div>
    </div>
  )
}

export default MainOfferCard