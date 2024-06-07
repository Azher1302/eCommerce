import React, { useState, useEffect } from 'react';
import CategoriesSlides from '../components/CategoriesSlides';
import Filter from '../components/Filter';
import Products from '../components/Products';
import Layout from '../layout/Layout';
import { ProductsData } from './../Data/ProductsData';
import Promos from './../components/Promos';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Shop() {
  const maxPage = 10;
  const [page, setPage] = useState(maxPage);

  const HandleLoadMore = () => {
    setPage(page + maxPage);
  };

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-4 my-6">
        <CategoriesSlides />
        <Filter total={ProductsData?.length} />
        <div
          className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
        >
          {ProductsData.slice(0, page)?.map((p) => (
            <Products bg={true} key={p._id} product={p} />
          ))}
        </div>
        <div className="w-full flex-colo my-12">
          <button
            onClick={HandleLoadMore}
            className="flex items-center justify-center gap-3 text-white py-3 px-8 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300"
          >
            Load More
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-white"></span>
            </span>
          </button>
        </div>
        <Promos />
      </div>
    </Layout>
  );
}

export default Shop;
