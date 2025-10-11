import React from 'react'
import MainOfferCard from '../component/home/Main-OfferCard';
import '../css/home.css/Main-OfferGrids.css';

const MainOfferGrid = () => {
  return (
  <div className="MainOfferGrid">
    <h1 className = "text1">Exclusive Offers & Sweet Deals</h1>
    <p className = "text2">Unwrap irresistible discounts on your favorite treats—because 
      every celebration deserves a little extra sweetness without the 
      extra cost</p>
    <div className="row">
        <div className="card1">
            <MainOfferCard 
            image={new URL('../assets/img6.jpeg', import.meta.url).href}
            title="New Year offers"
            discount="20% Off"
            />
        </div>
        <div className="card2">
            <MainOfferCard 
            image={new URL('../assets/img4.jpeg', import.meta.url).href}
            title="Valentine Special"
            discount="15% Off"
            />
        </div>
        <div className="card3">
            <MainOfferCard 
            image={new URL('../assets/img3.jpeg', import.meta.url).href}
            title="Merry Discount"
            discount="25% Off"
            />
        </div>
    </div>
  </div>
  )
}

export default MainOfferGrid