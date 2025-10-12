import React from 'react'
import Navbar from '../../component/common/Navbar/Navbar'
import Introduction from '../../component/aboutUs/aboutUsIntro'
import cakeImg from '../../assets/cake.png' 
import Footer from '../../component/common/Footer/Footer'


const AboutUs = () => {
  return (
    <>  
    <Navbar />
    
    <Introduction
      imageSrc={cakeImg}
      imageAlt="A beautifully decorated cake"
      imagePosition="background"
      >

    </Introduction>
    <Footer />
    </>
  )
}   
export default AboutUs