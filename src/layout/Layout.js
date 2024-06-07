import React from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from './footer/Footer';
import MobileFooter from './footer/MobileFooter';
// import MobileFooter from './footer/MobileFooter';
import Navbar from './navbar/Navbar';
//wrapper function

const Layout = ({ children }) => {
  return (
    <>
      <ToastContainer />
      <div className="font-sans">
        <Navbar />
        <div className="bg-white">{children}</div>
        {/* <MobileFooter /> */}
        <MobileFooter />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
