import React, { useEffect } from 'react';
import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import FlashDeal from '../components/Home/FlashDeal';
import PopularProducts from '../components/Home/PopularProducts';
import Promos from '../components/Promos';
import Layout from '../layout/Layout';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Storing arbitrary data in local storage under the 'ecommerce' key
    const ecommerceData = { admin: true, message: "Welcome to the ecommerce site" };
    localStorage.setItem('ecommerce', JSON.stringify(ecommerceData));

    // Example: Check for 'admin' in the local storage under the 'ecommerce' key
    const storedData = JSON.parse(localStorage.getItem('ecommerce'));
    if (!storedData || !storedData.admin) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Banner />
        <Categories />
        <PopularProducts />
        <Promos />
        <FlashDeal />
      </div>
    </Layout>
  );
}

export default HomeScreen;
