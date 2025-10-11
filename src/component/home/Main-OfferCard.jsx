import React from 'react'
import '../../css/home.css/Main-Offersgrid.css'

const MainOfferCard = ({ image, title, discount }) => {
  // background div uses the inline background-image so we can blur it independently
  const bgStyle = image ? { backgroundImage:`url(${image})` } : { backgroundColor: '#ccc' }

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
        <div className="badge-oval">
          <span className="badge-text">{discount}</span>
        </div>
      </div>
    </div>
  )
}

export default MainOfferCard