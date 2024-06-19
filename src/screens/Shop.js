import React, { useState } from 'react';
import CategoriesSlides from '../components/CategoriesSlides';
import Filter from '../components/Filter';
import Products from '../components/Products';
import Layout from '../layout/Layout';
import { ProductsData } from './../Data/ProductsData';
import Promos from './../components/Promos';
import ShopItems from './ShopItems';

function Shop() {
  const maxPage = 10;
  const [page, setPage] = useState(maxPage);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const HandleLoadMore = () => {
    setPage(page + maxPage);
  };

  const handleFilter = (category) => {
    if (category === 'All') {
      setFilteredProducts(null); // Show all products
    } else {
      const filtered = ProductsData.filter((product) =>
        product.categories.includes(category)
      );
      setFilteredProducts(filtered);
    }
  };

  const displayedProducts = filteredProducts || ProductsData.slice(0, page);

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-4 my-6">
        <CategoriesSlides />
        <Filter total={ProductsData?.length} onFilter={handleFilter} />
        <div className="grid gap-6 mt-6 sm:mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {displayedProducts.map((p) => (
            <Products bg={true} key={p._id} product={p} />
            
            
          ))
          }
          
        </div>
        <ShopItems />
        {page < ProductsData.length && (
          <div className="w-full flex justify-center my-12">
            <button
              onClick={HandleLoadMore}
              className="flex items-center justify-center gap-3 py-3 px-8 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Load More
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-5 w-5 rounded-full bg-white"></span>
              </span>
            </button>
          </div>
        )}
       
        <Promos />
      </div>
    </Layout>
  );
}

export default Shop;
