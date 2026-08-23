import React from 'react';
import Navbar from '../../component/common/Navbar/Navbar';
import AdminNavbar from '../../component/admin/AdminNavbar';
import AddOffer from '../../component/admin/OfferForm';
import Footer from '../../component/common/Footer/Footer';

const ManageOffers = () => {
  return (
    <>
      <Navbar />
      <AdminNavbar />
      <AddOffer />
      <Footer />
    </>
  );
};

export default ManageOffers;
