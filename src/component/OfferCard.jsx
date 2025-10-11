import React from 'react'

const Offercard = ({ icon, title,weight,description,discountPrice,currentPrice,expiryDate }) => {
    return (
        
        <div className="offer-card"> //main card container
            <div className="offer-icon">//image container
            <imag src={icon} alt={title} />
                <div className='expiryDate'>
                <p>Expires on: {expiryDate}</p>
                </div>
            </div>


            <div className='offer-content'>
                <h3>{title}</h3>//product name ex:choclate cake
                <h4>{weight}</h4>// weight of cake ex: 1kg
                <p>{description}</p>// short description of product
            </div> 


            <div className='offer-price'> 
                <div className='currentPrice'>
                    <p className='currentPrice'>Rs.{currentPrice}</p>// current price 
                </div>
                <div className='discountPrice'>
                    <p className='discountPrice'>Rs.{discountPrice}</p>// discounted price
                </div>
                     

            </div>
            <div className='offer-action'>
                <button className='add-to-cart'>Add to Cart</button>// add to cart button
            </div>

        </div>
    );
};

export default Offercard;