import React from 'react'
import Navbar from '../../component/common/Navbar/Navbar'
import AdminNavbar from '../../component/admin/AdminNavbar'
import Footer from '../../component/common/Footer/Footer'
import CategoryGrid from '../categorygrid'
import Featuregrid from '../Featuregrid'
import ImagesSlider from '../../component/home/ImagesSlider.jsx'
import MainOfferGrid from '../Main-OfferGrid'
import MidBar from '../MiddleBar.jsx'

const AdminHome = () => {
  return (
    <>
    <Navbar />
    <AdminNavbar />
    <ImagesSlider />
    <CategoryGrid />
    <MidBar />
    <MainOfferGrid />
    <Featuregrid />

    <Footer />
    </>
  )
}

export default AdminHome