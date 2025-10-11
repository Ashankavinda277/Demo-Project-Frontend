import React from 'react'
import Navbar from '../../component/common/Navbar/Navbar'
import CategoryGrid from '../categorygrid'
import Featuregrid from '../Featuregrid'
import ImagesSlider from '../../component/home/ImagesSlider'
import MainOfferGrid from '../Main-OfferGrid'
import Footer from '../../component/common/Footer/Footer'

const HomePage = () => {
  return (
    <>
    <Navbar />
    <ImagesSlider />
    <CategoryGrid />
    <MainOfferGrid />
    <Featuregrid />
    <Footer />


    </>
    
  )
}

export default HomePage