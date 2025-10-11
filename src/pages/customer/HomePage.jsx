import React from 'react'
import Navbar from '../../component/common/Navbar/Navbar'
import CategoryGrid from '../categorygrid'
import Featuregrid from '../Featuregrid'
import ImagesSlider from '../../component/home/ImagesSlider'
import MainOfferGrid from '../Main-OfferGrid'

const HomePage = () => {
  return (
    <>
    <Navbar />
    <ImagesSlider />
    <CategoryGrid />
    <MainOfferGrid />
    <Featuregrid />


    </>
    
  )
}

export default HomePage