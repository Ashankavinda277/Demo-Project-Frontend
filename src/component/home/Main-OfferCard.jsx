import React from 'react'

const MainOfferCard = ({image,title, discount}) => {
  return (
    <div className="offer-card"
    style={{backgroundImage: `url(${image})`}}>
      <h2>{title}</h2>
      <p>Discount: {discount}</p>
    </div>
  )
}

export default MainOfferCard