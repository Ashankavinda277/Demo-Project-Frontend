import React from 'react'
import '../css/home.css/MiddleBar.css'

const MidBar = () => {
  const bgUrl = new URL('../assets/img11.jpeg', import.meta.url).href
  const leftStyle = { backgroundImage: `url(${bgUrl})` }

  return (
    <section className="MidBar" role="region" aria-label="Feature">
      <div className="mid-row">
        <div className="mid-left" style={leftStyle}>
          <div className="mid-left-overlay">
            <h2 className="mid-left-title">Slice Of Heaven</h2>
          </div>
        </div>

        <div className="mid-right">
          <small className="mid-kicker">Turning celebrations into sweet memories</small>
          <h1 className="mid-heading">
            Allow us to ensure that your event is more than just an event, but rather a memorable food experience that will create lasting memories for you and your guests.
          </h1>
          <p className="mid-text">
            We don’t just bake cakes—we craft edible celebrations designed to elevate your special occasions
            with elegance, flavor, and unforgettable charm. From the very first slice to the last bite, we ensure every celebration becomes a cherished memory.
          </p>
        </div>
      </div>
    </section>
  )
}

export default MidBar