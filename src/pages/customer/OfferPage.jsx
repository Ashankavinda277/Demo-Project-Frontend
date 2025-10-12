import React from 'react'
import Navbar from '../../component/common/Navbar/Navbar'
import OfferGrid from '../../component/promotion/OfferGrid';
import '../../css/offerPage.css';

const OfferPage = () => {
    return (
        <div className="offer-page">
           
            <Navbar />
             <h1 className='title'>Our Special Offers</h1>
            <OfferGrid />
        </div>
    );
};

export default OfferPage;



// import OfferGrid from '../../component/promotion/OfferGrid'

// const OfferPage = () => {
//   return (
//     <div className= "offer-page">
//   <Navbar/>
//   <OfferGrid/>
//   </div>
//   )
// }

// export default OfferPage
