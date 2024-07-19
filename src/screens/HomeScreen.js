


// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Banner from '../components/Home/Banner';
// import Categories from '../components/Home/Categories';
// import FlashDeal from '../components/Home/FlashDeal';
// import PopularProducts from '../components/Home/PopularProducts';
// import Promos from '../components/Promos';
// import Layout from '../layout/Layout';
// import Navbar from '../layout/navbar/Navbar';

// function HomeScreen() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Storing arbitrary data in local storage under the 'ecommerce' key
//     const ecommerceData = { admin: true, message: "Welcome to the ecommerce site" };
//     localStorage.setItem('ecommerce', JSON.stringify(ecommerceData));

//     // Example: Storing the admin token (replace 'your_admin_token' with your actual token)
//     const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhOTA0YjM2Mi0xNGE5LTQyM2QtYjIyNi01NjBhMDFkOTYwOTAiLCJNb2JpbGUiOiIwIiwiVXNlcl9JZCI6IjIiLCJVc2VyX1R5cGUiOiIyIiwiZXhwIjoxNzI4MDE4ODk4LCJpc3MiOiJJbml0U291bHV0aW9ucyIsImF1ZCI6IkluaXRTb3VsdXRpb25zIn0.HtL4k7qjmnnQKQzl9I0RTCDtMSX85iCXjNeD0V92U8M';
//     localStorage.setItem('adminToken1', adminToken);

//     // Check for 'admin' in the local storage under the 'ecommerce' key and for adminToken
//     const storedData = JSON.parse(localStorage.getItem('ecommerce'));
//     const storedToken = localStorage.getItem('adminToken1');
//     if (!storedData || !storedData.admin || !storedToken) {
//       navigate('/');
//     }
//   }, [navigate]);

//   return (
//     <Layout>
//       {/* <Navbar /> */}
//       <div className="min-h-screen container mx-auto px-2 my-6">
//         <Banner />
//         <div style={{ paddingBottom: '1rem' }}>
//           <Categories />
//         </div>
//         {/* <ShopItems /> */}
//         <PopularProducts />
//         <Promos />
//         <FlashDeal />
//       </div>
//     </Layout>
//   );
// }

// export default HomeScreen;






import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import FlashDeal from '../components/Home/FlashDeal';
import PopularProducts from '../components/Home/PopularProducts';
import Promos from '../components/Promos';
import Layout from '../layout/Layout';
import SearchBar from './SearchBar';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Storing arbitrary data in local storage under the 'ecommerce' key
    const ecommerceData = { admin: true, message: "Welcome to the ecommerce site" };
    localStorage.setItem('ecommerce', JSON.stringify(ecommerceData));

    // Example: Storing the admin token (replace 'your_admin_token' with your actual token)
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhOTA0YjM2Mi0xNGE5LTQyM2QtYjIyNi01NjBhMDFkOTYwOTAiLCJNb2JpbGUiOiIwIiwiVXNlcl9JZCI6IjIiLCJVc2VyX1R5cGUiOiIyIiwiZXhwIjoxNzI4MDE4ODk4LCJpc3MiOiJJbml0U291bHV0aW9ucyIsImF1ZCI6IkluaXRTb3VsdXRpb25zIn0.HtL4k7qjmnnQKQzl9I0RTCDtMSX85iCXjNeD0V92U8M';
    localStorage.setItem('adminToken1', adminToken);

    // Check for 'admin' in the local storage under the 'ecommerce' key and for adminToken
    const storedData = JSON.parse(localStorage.getItem('ecommerce'));
    const storedToken = localStorage.getItem('adminToken1');
    if (!storedData || !storedData.admin || !storedToken) {
      navigate('/');
    }

    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.onlineshop.initstore.com/api/Master/Get_All_Items');
        // Filter out products with Status = 2
        const availableProducts = response.data.filter(product => product.Status !== 2);
        setProducts(availableProducts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleSearch = (query) => {
    if (query) {
      const filteredResults = products.filter(product =>
        product.ItemName.toLowerCase().includes(query.toLowerCase()) &&
        product.Status !== 2 // Ensure that status is not 2
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]); // Clear search results if query is empty
    }
  };

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Banner />
        <SearchBar onSearch={handleSearch} />
        {loading && <p className="text-center text-lg">Loading...</p>}
        {error && <p className="text-center text-lg text-red-500">Error: {error.message}</p>}
        <div style={{ paddingBottom: '1rem' }}>
          <Categories />
        </div>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {searchResults.map(product => (
              <div key={product.Id} className="bg-white shadow-lg rounded-xl overflow-hidden">
                <img
                  src={`https://api.onlineshop.initstore.com/api/Master/LoadItemImage?ImageName=${product.ItemImage}`}
                  alt={product.ItemName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.ItemName}</h3>
                  <p className="text-sm">{product.ItemDescription}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <PopularProducts />
            <Promos />
            <FlashDeal />
          </>
        )}
      </div>
    </Layout>
  );
};

export default HomeScreen;
