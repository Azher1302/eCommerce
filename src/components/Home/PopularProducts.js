import React from 'react';
import Titles from '../Titles';
import { BsCollectionFill } from 'react-icons/bs';
import { ProductsData } from '../../Data/ProductsData';
import Products from '../Products';

function PopularProducts() {
  const ProductsArray = ProductsData.sort(() => Math.random() - Math.random()).slice(0, 8);
  
  return (
    <div className="sm:my-20 my-8 bg-deepest xl:py-16 py-10 sm:px-10 px-6">
      <Titles title="Popular Products" Icon={BsCollectionFill} />
      <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {ProductsArray.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <Products bg={false} product={product} />
            <div className="p-4">
              {/* Title removed as per your request */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
