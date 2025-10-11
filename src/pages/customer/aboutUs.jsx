import React from 'react'
import Navbar from '../../component/common/Navbar/Navbar'
import Introduction from '../../component/aboutUs/aboutUsIntro'
import cakeImg from '../../assets/cake.png' 

const AboutUs = () => {
  return (
    <>  
    <Navbar />
    <Introduction
     title="About Our Bakery"
        imageSrc={cakeImg}
        imageAlt="A beautifully decorated cake"
        imagePosition="left"
      >

    </Introduction>
    </>
  )
}   
export default AboutUs