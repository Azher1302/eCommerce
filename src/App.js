//import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import { Routes, Route } from 'react-router-dom';
// import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutUs from './screens/AboutUs';
import ContactUs from './screens/ContactUs';
import Shop from './screens/Shop';
import FAQPage from './screens/FAQ';
import PrivacyPolicy from './screens/Privacy';
import TermAndConditions from './screens/TermsCondition';
import CategoryPage from './screens/CategoryPage';
import Checkout from './screens/Checkout';
import OrderScreen from './screens/OrderScreen';
import Dashboard from './screens/Dashboard/Admindashboard';
import Orders from './screens/Dashboard/myOrders';
import UpdateProfile from './screens/Dashboard/UpdateProfile';

import Password from './screens/Dashboard/Password';
import ScrollToTop from './ScrollOnTop';
import NotFound from './screens/NotFound';


import { PopUpProvider } from './Context/PopUpContex';
import AdminPage from './components/Modals/adminlogin';
import Home1 from './adminlogin/Home1';
import { Toaster } from "react-hot-toast";
import AdminInput from './screens/Dashboard/Admindashboard';
import AdminDashboard from './screens/Dashboard/Admindashboard';
import DashboardProducts from './screens/Dashboard/Dashboardproducts';
import DashboardCategories from './screens/Dashboard/Dashboardcategories';
import AdminLogin from './adminlogin/Adminlogin';
import DashboardItem from './screens/Dashboard/Dashboarditem';
import DashboardUserSignInTable from './screens/Dashboard/itemmaster/dashboardUserSignInTable';
import MyOrders from './screens/Dashboard/myOrders';
// import OrderConfirmation from './components/OrderConfirmation';
import Table from './components/Table';
import SignIn from './components/Modals/signin';
import LoginMobile from './layout/footer/LoginMobile';

import UserProfile from './layout/navbar/Userprofile'
import LoadingSpinner from './spinner/LoadingSpinner';
import AllItemShow from './screens/Dashboard/itemmaster/AllItemShow';
import AllProductShow from './screens/Dashboard/itemmaster/AllProductShow';
import Login from './components/Modals/Login';
import AdminSettings from './adminlogin/AdminSettings';
import ShopItems from './screens/ShopItems';
import Products from './components/Products';
import MobileNavebar from './layout/navbar/MobileNavebar';
import Flashproduct from './components/Home/Flashproduct';
import ProductModal1 from './components/Modals/ProductModal1';
import LoginModal from './components/Drawer/LoginModal';
import Categories from './components/Home/Categories';
import CategoriesShop from './components/Home/Categories';



function App() {
  
  return (
    <PopUpProvider>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms-condition" element={<TermAndConditions />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<OrderScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<UpdateProfile />} />
          <Route path="/password" element={<Password />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/Home1" element={<Home1/>} />
          <Route path='admininput' element={<AdminInput />} />
          <Route path='/Admindashboard' element={<AdminDashboard />} />
          <Route  path='/Dashboardproducts' element={<DashboardProducts />} /> 
          <Route path = '/Adminlogin' element={<AdminLogin />} />
          <Route path='Dashboarditem' element={< DashboardItem/>} />
          <Route path='dashboardUserSignInTable' element={<DashboardUserSignInTable/>} />
          <Route  path='/Dashboardcategories' element={<DashboardCategories />} /> 
          <Route path='/myOrder' element={<MyOrders />} />
          <Route path='/AllItemShow' element={<AllItemShow />} />
          <Route path='/Userprofile' element={<UserProfile />} />
          <Route path='/Table' element={<Table />} />
          <Route path='/Signin' element={<SignIn />} />
          <Route path='/LoadingSpinner' element={<LoadingSpinner />} />
          <Route path='/AllProductShow' element={<AllProductShow />} />
          <Route path='/LoginMobile' element={<LoginMobile />} />
          <Route path='/AdminSettings' element={< AdminSettings />} />
          <Route path='/ShopItems' element={<ShopItems />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Flashproduct' element={<Flashproduct />} />
          <Route path='/ProductModal1' element={<ProductModal1 />} />
          <Route path='/LoginModal' element={<LoginModal />} />
          <Route path='/MobileNavebar' element={<MobileNavebar />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/CategoriesShop" element={<CategoriesShop />} />


  




        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </ScrollToTop>
    </PopUpProvider>
    
  );
}

export default App;
