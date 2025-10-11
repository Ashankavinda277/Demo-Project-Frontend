import React, { useState, useEffect } from 'react';
import '../../css/home.css/imageSlider.css';

const images = [
    {
   src: new URL('../../assets/img9.jpg', import.meta.url).href,
   alt: 'Orange White Choco Chip Gateau',
   title:'ORANGE WHITE Choco chip GATEAU',
   description: 'Indulge in the delightful taste of our Orange White Choco Chip Gateau, a perfect blend of citrusy freshness and creamy white chocolate chips, all layered in a moist and fluffy cake.',
    },
{
    src: new URL('../../assets/image1.jpg', import.meta.url).href,
    alt:'Delicious Chocolate Cake',
    title:'Delectable Chocolate Dream',
    description: 'A rich and moist chocolate cake topped with creamy chocolate frosting and garnished with chocolate shavings.',
},
{
    src: new URL('../../assets/img1.jpg', import.meta.url).href,
    alt:'Fresh Fruit Tart',
    title:'Berry Burst Fruit Tart',
    description: 'A refreshing combination of crisp pastry cream and an abundance of seasonal fresh berries.',
},
];

const ImagesSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="slider-container">
            {images.map((images, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${images.src})` }}
                >
                    <div className="slide-content">
                <p className="slide-tagline">Slice Of Heaven</p>
                <h2>{images.title}</h2>
                <p>{images.description}</p>
                </div>
                </div>
            ))}

            <div className="slider-dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
            </div>
    );
};

export default ImagesSlider;