import React from 'react'
import Footer from '../../component/common/Footer/Footer'
import Navbar from '../../component/common/Navbar/Navbar'
import ViewOrders from '../../component/admin/ViewOrders'
import AdminNavbar from '../../component/admin/AdminNavbar'

const Orders = () => {
  return (
    <>
  <Navbar />
  <AdminNavbar />
    <ViewOrders />
    <Footer />
    </>
  )
}

export default Orders