import React, { useState } from 'react';
import { FaRupeeSign, FaShoppingBag } from 'react-icons/fa';
import ProductModal from './Modals/ProductModal';
import './Products1.css'; // Import custom CSS for additional animations

function Products({ product, bg }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={product}
      />
      <div
        onClick={() => setModalOpen(true)}
        className="product-card cursor-pointer rounded border border-main p-4 bg-white hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative">
          {bg ? (
            <div className="w-full h-52 bg-white cursor-pointer rounded overflow-hidden">
              <img
                alt={product?.title}
                src={`/images/${product?.image}`}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
              {product.flashSale && (
                <div className="absolute top-3 left-3 z-10 px-3 py-1 text-xs font-bold text-white bg-flash rounded-full">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          ) : (
            <img
              alt={product?.title}
              src={`/images/${product?.image}`}
              className="object-contain w-full h-40 transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>
        <h3 className="my-2 font-semibold text-center">{product?.title}</h3>
        <div className="flex items-center justify-between">
          {product.flashSale ? (
            <div className="flex items-center text-lg font-black">
              <FaRupeeSign className="mr-1" />
              {product.salePrice}
              <del className="flex items-center ml-2 font-medium text-text">
                <FaRupeeSign className="mr-1" />
                {product.price}
              </del>
            </div>
          ) : (
            <div className="flex items-center text-lg font-black">
              <FaRupeeSign className="mr-1" />
              {product.price}
            </div>
          )}
          <button className="bg-main rounded-md transition hover:bg-subMain relative">
            <FaShoppingBag />
          </button>
        </div>
      </div>
    </>
  );
}

export default Products;
