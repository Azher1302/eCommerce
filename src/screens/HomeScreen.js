// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Banner from '../components/Home/Banner';
// import Categories from '../components/Home/Categories';
// import FlashDeal from '../components/Home/FlashDeal';
// import PopularProducts from '../components/Home/PopularProducts';
// import Promos from '../components/Promos';
// import Layout from '../layout/Layout';

// function HomeScreen() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Storing arbitrary data in local storage under the 'ecommerce' key
//     const ecommerceData = { admin: true, message: "Welcome to the ecommerce site" };
//     localStorage.setItem('ecommerce', JSON.stringify(ecommerceData));

//     // Storing the admin token
//     const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhOTA0YjM2Mi0xNGE5LTQyM2QtYjIyNi01NjBhMDFkOTYwOTAiLCJNb2JpbGUiOiIwIiwiVXNlcl9JZCI6IjIiLCJVc2VyX1R5cGUiOiIyIiwiZXhwIjoxNzI4MDE4ODk4LCJpc3MiOiJJbml0U291bHV0aW9ucyIsImF1ZCI6IkluaXRTb3VsdXRpb25zIn0.HtL4k7qjmnnQKQzl9I0RTCDtMSX85iCXjNeD0V92U8M";
//     localStorage.setItem('adminToken1', adminToken);

//     // Example: Check for 'admin' in the local storage under the 'ecommerce' key
//     const storedData = JSON.parse(localStorage.getItem('ecommerce'));
//     const storedToken = localStorage.getItem('adminToken');
//     if (!storedData || !storedData.admin || !storedToken) {
//       navigate('/');
//     }
//   }, [navigate]);

//   return (
//     <Layout>
//       <div className="min-h-screen container mx-auto px-2 my-6">
//         <Banner />
//         <Categories />
//         <PopularProducts />
//         <Promos />
//         <FlashDeal />
//       </div>
//     </Layout>
//   );
// }

// export default HomeScreen;




import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import FlashDeal from '../components/Home/FlashDeal';
import PopularProducts from '../components/Home/PopularProducts';
import Promos from '../components/Promos';
import Layout from '../layout/Layout';
import ShopItems from './ShopItems';

function HomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Storing arbitrary data in local storage under the 'ecommerce' key
    const ecommerceData = { admin: true, message: "Welcome to the ecommerce site" };
    localStorage.setItem('ecommerce', JSON.stringify(ecommerceData));

    // Example: Storing the admin token (replace 'your_admin_token' with your actual token)
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhOTA0YjM2Mi0xNGE5LTQyM2QtYjIyNi01NjBhMDFkOTYwOTAiLCJNb2JpbGUiOiIwIiwiVXNlcl9JZCI6IjIiLCJVc2VyX1R5cGUiOiIyIiwiZXhwIjoxNzI4MDE4ODk4LCJpc3MiOiJJbml0U291bHV0aW9ucyIsImF1ZCI6IkluaXRTb3VsdXRpb25zIn0.HtL4k7qjmnnQKQzl9I0RTCDtMSX85iCXjNeD0V92U8M' ;
    localStorage.setItem('adminToken1', adminToken);

    // Check for 'admin' in the local storage under the 'ecommerce' key and for adminToken
    const storedData = JSON.parse(localStorage.getItem('ecommerce'));
    const storedToken = localStorage.getItem('adminToken1');
    if (!storedData || !storedData.admin || !storedToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Banner />
        <Categories />
        {/* < ShopItems /> */}
        <PopularProducts />
        <Promos />
        <FlashDeal />
      </div>
    </Layout>
  );
}

export default HomeScreen;
