import React from 'react'
import Navbar from '../../component/common/Navbar/Navbar'
import CategoryGrid from '../categorygrid'
import Featuregrid from '../Featuregrid'
import ImagesSlider from '../'
import MainOfferGrid from '../Main-OfferGrid'
import Footer from '../../component/common/Footer/Footer'
import MidBar from '../MidBar'

const HomePage = () => {
  return (
    <>
    <Navbar />
    <ImagesSlider />
    <CategoryGrid />
    <MainOfferGrid />
    <Featuregrid />
    <Footer />
    <MidBar />


    </>
    
  )
}

export default HomePage