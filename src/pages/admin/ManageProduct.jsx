import React from 'react'
import Navbar from '../../component/common/Navbar/Navbar'
import AdminNavbar from '../../component/admin/AdminNavbar'
import AddProductPage from '../../component/admin/ProductForm'
import Footer from '../../component/common/Footer/Footer'

const ManageProduct = () => {
  return (
    <>
    <Navbar/>
    <AdminNavbar/>
    <AddProductPage/>
    <Footer/>
    </>
  )
}

export default ManageProduct