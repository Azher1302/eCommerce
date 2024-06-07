import React from 'react';
import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import FlashDeal from '../components/Home/FlashDeal';
import PopularProducts from '../components/Home/PopularProducts';
import Promos from '../components/Promos';
import Layout from '../layout/Layout';

function HomeScreen() {
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
